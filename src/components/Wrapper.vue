<script setup>
import cx from "classnames";
</script>

<template>
    <div class="w-full">
        <div class="relative flex min-h-screen items-center justify-center overflow-hidden">
            <div
                :class="['relative flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8', 'max-sm:w-full',]"
            >
                <div class="mt-8 overflow-hidden bg-white/60 sm:flex sm:rounded-lg sm:shadow">
                    <div class="sm:w-full  ">
                        <div class="h-full px-4 py-8 sm:px-10 w-[400px] ">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>