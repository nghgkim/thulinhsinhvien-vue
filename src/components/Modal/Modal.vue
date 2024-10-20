<script setup>

</script>

<template>
    <div :class="['fixed left-0 right-0 top-0 z-50 h-screen bg-black/10', 'flex items-center justify-center']">
        <div class="max-h-[500px] min-w-[200px] overflow-hidden rounded-lg bg-color-white shadow-lg p-4">
            <slot></slot>
        </div>
    </div>
</template>