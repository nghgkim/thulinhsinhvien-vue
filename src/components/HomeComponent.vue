<script setup>
import cx from "classnames";
import { ref, inject } from "vue";
import { io } from 'socket.io-client';
import { store } from '../store/index.js'
import { getProcess } from "../utils/service/process.js";
import { sendVoting } from "../utils/service/audiences";

import Button from "../components/Button/Button.vue";
import Modal from "../components/Modal/Modal.vue";

const $cookies = inject('$cookies');

// const socket = io('http://localhost:3001');
const username = $cookies.get('username');
const students = ref("");
const currentStudentIndex = ref(0);
const seconds = ref(0);
const process = ref(0);
const isModal = ref(false);
const isCountDown = ref(false);
const vote = ref("");

//dunction gọi để chờ bắt đầu bình chọn
const waitStart = () => {
    // Nhận tin nhắn từ server
    socket.on('message', (msg) => {
        startTimer();
    });

    // Dọn dẹp khi component unmount
    return () => {
        socket.off('message');
    };
};

const startTimer = () => {
    process.value = 1;
    seconds.value = 30;
};

const openModal = (option) => {
    isModal.value = true;
    vote.value = option;
};

const closeModal = () => {
    isModal.value = false;
    vote.value = "";
};

const countDown = () => {
    if (isCountDown) {
        if (seconds.value > 0) {
            seconds.value--;
        }

        setTimeout(countDown, 1000);
    }
}

countDown();

//hàm sử lý khi bình chọn hoặc không bình chọn
const handelVote = async () => {
    /**
     *
     * đoạn này dùng để gửi bình chọn tới server
     */
    console.log(vote.value)

    const res = await sendVoting(username, students.value, vote.value);

    process.value = 2;
    closeModal();
};

const callProcess = async () => {
    const res = await getProcess();

    students.value = res.student;
    if (process.value === 0) {
        seconds.value = res.remainingTime;
    }

    if (res.isProcessing) {
        if (seconds.value === 60) {
            process.value = 0;
        } else {
            if (process.value !== 2) {
                process.value = 1;
                isCountDown.value = true;
            }
        }
    } else {
        process.value = 0;
        seconds.value = res.remainingTime;
    }

}

window.setInterval(callProcess, 200);
callProcess();
</script>

<template>
    <div class="flex justify-center pt-20 h-screen">
        <div class="mt-16 flex-1 flex flex-col justify-between">
            <div class="w-full px-4 flex flex-col items-center gap-4 ">
                <div
                    class="w-full py-4 flex justify-center font-medium rounded-lg bg-primary-200 flex-1 border border-solid border-primary-500"
                >
                    Thí Sinh {{ currentStudentIndex + 1 }}: {{ students }}
                </div>
                <div
                    v-if="process !== 0"
                    :class="['border border-solid border-primary-500', 'rounded-full flex justify-center items-center h-24 w-24 bg-primary-200', 'font-semibold text-[24px]', seconds <= 10 && 'bg-red-400']"
                >
                {{ seconds }} S
                </div>
            </div>

            <div class="flex flex-col items-center flex-1 mt-20">
                <div
                    v-if="process === 1 || process === 2"
                    class="flex gap-8 flex-col items-center mb-4"
                >
                    <Button
                        large
                        @click="openModal('LIKE')"
                        :class="['w-[200px]', process === 2 && !vote && 'hidden']"
                    >
                        Bình chọn
                    </Button>
                    <Button
                        large
                        @click="openModal('DISLIKE')"
                        :class="['w-[200px] !bg-red-400', process === 2 && !vote && 'hidden']"
                    >
                        Không bình chọn
                    </Button>
                </div>

                <div v-if="process === 0" class="flex flex-col gap-8">
                    <div>Chưa đến thời gian bình chọn cho thí sinh</div>
                </div>

                <div :class="['flex flex-col gap-8', process !== 2 && 'hidden']">
                    <div>Cảm ơn bạn đã lựa chọn</div>
                </div>
            </div>
        </div>
        <Modal v-if="isModal">
            <div :class="cx('p-4')">
                <div>Bạn chắc chắn với lựa chọn của mình</div>
                <div class="flex justify-between mt-8">
                <Button medium @click="handelVote">Có</Button>
                <Button medium @click="closeModal">Không</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>