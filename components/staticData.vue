<script lang="ts"
        setup>
const { hasPerm } = useAuthorization();

const { convertDateTime } = useUtils();

const props = defineProps({
    ahref: {
        type: String,
        required: false
    },
    class_name: {
        type: String,
        required: false
    },
    currency: {
        type: String,
        required: false
    },
    datetime: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    permission: {
        type: String,
        required: false
    },
    text_left: {
        type: null,
        required: false
    },
    text_right: {
        type: null,
        required: false
    },
    value: {
        type: null,
        required: false
    }
});
</script>

<template>
    <div class="mb-2">
        <h6 class="fw-bold">{{ name }}</h6>

        <div v-if="value && !ahref">
            {{ text_left }} {{ value }} {{ text_right }}
        </div>

        <div v-if="datetime">
            {{ convertDateTime(datetime) }}
        </div>

        <div v-if="ahref">
            <NuxtLink v-if="hasPerm(<string>permission)"
                      :class="`${class_name}`"
                      :to="ahref">
                {{ value }}
            </NuxtLink>

            <div v-else>
                {{ value }}
            </div>
        </div>

        <div v-if="currency">
            ${{ currency }}
        </div>
    </div>
</template>

<style scoped>

</style>