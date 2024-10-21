<script setup>
    import { ref, toRefs, watch, defineEmits } from 'vue';
    
    const props = defineProps({
        name: { type: String, required: true },
        modelValue: { type: String, default: '' },
        type: { type: String, default: 'text' },
        placeholder: { type: String, default: '' },
        rightText: { type: String, default: '' },
        required: { type: Boolean, default: false },
        label: { type: String, required: true },
        error: { type: String, default: '' },
        disabled: { type: Boolean, default: false },
        className: { type: String, default: '' },
    });
    
    const emits = defineEmits(['update:modelValue']);
    
    // const { modelValue } = toRefs(props);
    
    const visiblePassword = ref(false);
    
    const changeVisiblePassord = () => {
        visiblePassword.value = !visiblePassword.value;
    };
    
    const onInput = (event) => {
        emits('update:modelValue', event.target.value);
    };
</script>

<template>
    <div :class="[className]">
        <label :for="name" class="block text-sm font-medium text-gray-700">
            {{ label }}
        </label>
        <div class="mt-1">
            <div class="relative">
            <input
                :id="name"
                :autocomplete="name"
                :type="visiblePassword && type === 'password' ? 'text' : type"
                :placeholder="placeholder"
                :required="required"
                :disabled="disabled"
                :value="modelValue"
                @input="onInput"
                :class="[
                'block w-full rounded-md border border-primary-200',
                'px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500',
                'sm:text-sm',
                error && '!border-red-500',
                ]"
            />
    
            <div
                v-if="type === 'password'"
                class="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer"
                @click="changeVisiblePassord"
            >
                <!-- <font-awesome-icon
                    :icon="visiblePassword? ['fas', 'eye'] : ['fas', 'eye-slash']"
                    
                /> -->
            </div>
    
            <div
                v-if="rightText"
                class="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer"
            >
                {{ rightText }}
            </div>
            </div>
    
            <div v-if="error" class="mt-1 text-sm text-red-500">
                {{ error }}
            </div>
        </div>
    </div>
</template>