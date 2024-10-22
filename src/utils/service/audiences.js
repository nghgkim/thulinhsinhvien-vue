import { readData, updateDataWithTransaction, writeData } from "../firebase";

// Gọi hàm này để kiểm tra xem tài khoản tồn tại không
export async function login(username, password) {
  try {
    const account = await readData(`accounts/${username}`);
    if (account && account.password == password) {
      await writeData(`${username}/isActive`, true);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Xảy ra lỗi trong quá trình đăng nhập ", error);
    return false;
  }
}

// Gọi hàm này để gửi kết quả lên server -> option là LIKE / DISLIKE
export async function sendVoting(username, thisinh, option) {
  try {
    // Kiểm tra đã bình chọn hay chưa
    let isVoted = await readData(`audiences/${username}/voted/${thisinh}`);
    if (isVoted) {
      return {
        success: false,
        message: `Bạn đã bình chọn cho thí sinh ${thisinh} rồi.`,
      };
    }

    // Cập nhật danh sách yêu thích của khán giả
    let voteData = (await readData(`audiences/${username}/like`)) || [];
    if (option === "LIKE") {
      voteData.push(thisinh);
      await writeData(`audiences/${username}/like`, voteData);

      // Sử dụng transaction để đảm bảo cập nhật an toàn
      await updateDataWithTransaction(
        `examinees/${thisinh}/chandungthulinh/sinhvien/vote`,
        (currentVotes) => {
          return (currentVotes || 0) + 1;
        }
      );

      return { success: true, message: "Bình chọn thành công!" };
    } else if (option === "DISLIKE") {
      // Sử dụng transaction để cập nhật số lượng không bình chọn
      await updateDataWithTransaction(
        `examinees/${thisinh}/sinhvien/noVote`,
        (currentNoVotes) => {
          return (currentNoVotes || 0) + 1;
        }
      );
      return { success: true, message: "Bình chọn thành công!" };
    } else {
      return { success: false, message: "Lựa chọn không hợp lệ." };
    }
  } catch (error) {
    console.error(`Lỗi khi xử lý bình chọn của ${username}:`, error);
    return { success: false, message: "Có lỗi xảy ra, vui lòng thử lại sau." };
  }
}
