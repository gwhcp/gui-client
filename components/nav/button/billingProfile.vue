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
        <NuxtLink v-if="route.name === 'billing-profile' && hasPerm('client_billing_profile.add_billingprofile')"
                  class="btn btn-success"
                  to="/billing/profile/create"
                  type="button">
            <svg class="bi">
                <use xlink:href="#circle-plus"/>
            </svg>

            Create
        </NuxtLink>

        <ModalDelete v-if="cellSelected && hasPerm('client_billing_profile.delete_billingprofile')"
                     :deleteFunction="<Function>deleteFunction"
                     :message-error="formErrors"
                     :params="{ id: cellParams?.['id'] }"
                     message-alert="Continuing will remove this billing profile."
                     message-success="Billing profile has been removed."
                     redirect="/billing/profile"/>

        <NuxtLink v-if="cellSelected && route.name !== 'billing-profile-billing_id-edit' && hasPerm('client_billing_profile.change_billingprofile')"
                  :to="`/billing/profile/${cellParams?.['id']}/edit`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#pen-to-square"/>
            </svg>

            Edit
        </NuxtLink>

        <NuxtLink v-if="route.name === 'billing-profile-billing_id-edit' && hasPerm('client_billing_invoice.view_billinginvoice')"
                  :to="`/billing/invoice/${route.params['billing_id']}`"
                  class="btn btn-primary"
                  type="button">
            <svg class="bi">
                <use xlink:href="#magnifying-glass"/>
            </svg>

            Invoices
        </NuxtLink>

        <NuxtLink v-if="route.name !== 'billing-profile' && hasPerm('client_billing_profile.view_billingprofile')"
                  class="btn btn-primary"
                  to="/billing/profile"
                  type="button">
            <svg class="bi">
                <use xlink:href="#magnifying-glass"/>
            </svg>

            Search
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