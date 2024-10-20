<template>
    <Wrapper>
        <form @submit.prevent="onSubmit">
            <CustomInput
                v-model="formData.phoneNumber"
                name="phoneNumber"
                label="Tên đăng nhập"
                type="tel"
                :error="errors.phoneNumber"
            />
            <CustomInput
                v-model="formData.password"
                name="password"
                label="Mật Khẩu"
                type="password"
                :error="errors.password"
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
    import { ref } from 'vue';
    import { z } from 'zod';
    import { useForm, useField } from 'vee-validate';
    import * as yup from 'yup';
    import { toTypedSchema } from '@vee-validate/zod';
    import CustomInput from './Input/Input.vue';
    import Wrapper from './Wrapper.vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    
    const schema = yup.object({
        phoneNumber: yup.string().required('Số điện thoại là bắt buộc'),
        password: yup.string().required('Mật khẩu là bắt buộc'),
    });

    // Set up form handling with VeeValidate
    const { handleSubmit, errors } = useForm({
        validationSchema: schema,
    });
    
    const formData = ref({
        phoneNumber: '',
        password: '',
    });
    
    const onSubmit = (values) => {
        console.log(values);
        router.push({ path: "/" });
    };
</script>