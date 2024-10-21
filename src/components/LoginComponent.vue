<template>
    <Wrapper>
        <form @submit.prevent="onSubmit">
            <CustomInput
                v-model="formData.username"
                name="username"
                label="Tên đăng nhập"
                type="text"
            />
            <CustomInput
                v-model="formData.password"
                name="password"
                label="Mật Khẩu"
                type="password"
            />
            <button 
                type="submit"
                :class="['bg-primary flex w-full justify-center rounded-md border border-transparent', 'px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-500']"
            >
                Đăng nhập
            </button>
        </form>
    </Wrapper>
</template>
  
<script setup>
    import { login } from "../utils/service/audiences.js";

    import { ref } from 'vue';
    import { useForm } from 'vee-validate';
    import * as yup from 'yup';
    import CustomInput from './Input/Input.vue';
    import Wrapper from './Wrapper.vue';
    import { useRouter } from 'vue-router';
    import { store } from '../store/index.js'

    const router = useRouter();
    
    const schema = yup.object({
        phoneNumber: yup.string().required('Tên đăng nhập là bắt buộc'),
        password: yup.string().required('Mật khẩu là bắt buộc'),
    });

    const { handleSubmit, errors } = useForm({
        validationSchema: schema,
    });
    
    const formData = ref({
        username: '',
        password: '',
    });
    
    const onSubmit = async (values) => {
        console.log(formData.value.username);
        console.log(formData.value.password);
        
        try {
            const res = await login(formData.value.username, formData.value.password);
            console.log(res);

            if (res === true) {
                store.username = formData.value.username;
                router.push({ path: "/" });
            }
        } catch (err) {
            console.log(err);
        }
        
        
    };
</script>