<script lang="ts"
        setup>
const { hasPerm } = useAuthorization();

const props = defineProps({
    cellParams: {
        type: Object,
        required: false
    },
    cellSelected: {
        type: Boolean,
        required: false
    },
    deleteFunction: {
        type: Function,
        required: false
    },
    formErrors: {
        type: Object,
        required: false
    }
});

const route = useRoute();
</script>

<template>
    <div class="d-grid gap-2 d-md-flex mb-3">
        <NuxtLink v-if="route.name !== 'account-accesslog' && hasPerm('client_account.view_accesslog')"
                  class="btn btn-primary"
                  to="/account/accesslog"
                  type="button">
            <svg class="bi">
                <use xlink:href="#circle-info"/>
            </svg>

            Access Log
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'account' && hasPerm('client_account.change_account')"
                  class="btn btn-primary"
                  to="/account"
                  type="button">
            <svg class="bi">
                <use xlink:href="#pen-to-square"/>
            </svg>

            Edit
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'account-password' && hasPerm('client_account.change_account')"
                  class="btn btn-primary"
                  to="/account/password"
                  type="button">
            <svg class="bi">
                <use xlink:href="#lock"/>
            </svg>

            Password
        </NuxtLink>
    </div>
</template>

<style scoped>
.bi {
    display: inline-block;
    width: 1rem;
    height: 1rem;
}
</style>