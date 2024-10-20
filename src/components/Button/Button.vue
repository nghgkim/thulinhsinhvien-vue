<script setup>
import classNames from 'classnames/bind';
</script>

<template>
    <button
        :class="['rounded-lg bg-primary-500 px-[11px] py-[5px] text-color-white font-semibold', medium && '!rounded-xl !px-[15px] !py-[13px] !text-[18px]', large && '!rounded-xl !px-[21px] !py-[17px] !text-[20px]']"
        @click=onClick
        type={type}
    >
        <slot></slot>
    </button>
</template>