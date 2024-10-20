<script setup>
import cx from "classnames";

import logo1 from "../assets/img/logo1.png";
import logo2 from "../assets/img/logo2.png";
import footer1 from "../assets/img/footer1.png";
import footer2 from "../assets/img/footer2.png";

import LoginComponent from "../components/LoginComponent.vue";
</script>

<template>
    <div class="content bg-background-image bg-cover w-screen h-screen">
        <div class="flex justify-between items-center px-4 pt-4 fixed top-0 w-full">
            <img :src=logo1 alt="Hội thi thủ lĩnh sinh viên" class="h-16 object-cover" />
            <img :src=logo2 alt="Phần thi chân chung thủ lĩnh" class="h-16 object-cover" />
        </div>
        <LoginComponent />
        <div class="flex justify-between items-center fixed bottom-0 w-full z-10">
            <img :src=footer2 alt="Hội thi thủ lĩnh sinh viên" class="h-20 object-cover" />
            <img :src=footer1 alt="Phần thi chân chung thủ lĩnh" class="h-20 object-cover" />
        </div>
    </div>
</template>