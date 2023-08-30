<script lang="ts"
        setup>
import { number, object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { createProfile, formObj } = useBillingProfile();

const route = useRoute();

const schema = object({
    address: string().required(),
    city: string().required(),
    country: string().required(),
    credit_card_cvv2: string().required().min(3).max(4),
    credit_card_month: string().required().length(2),
    credit_card_name: string().required(),
    credit_card_number: string().required().min(15).max(16),
    credit_card_year: string().required().length(4),
    name: string().required(),
    primary_phone: number().required().positive().integer(),
    state: string().required(),
    zipcode: string().required()
});

definePageMeta({
    description: 'Create Billing Profile',
    title: 'Create Billing Profile'
});

onMounted(() => {
    hasAccess('client_billing_profile.view_billingprofile');

    hasPermForm('client_billing_profile.add_billingprofile');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonBillingProfile/>

    <Form :validation-schema="schema"
          @submit="createProfile">
        <div class="row row-cols-1 row-cols-lg-2 g-3 mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormText v-model="formObj['name']"
                              :required="true"
                              help-text="Can be any name to help identify this profile"
                              label="Name"
                              name="name"/>

                    <FormText v-model="formObj['address']"
                              :required="true"
                              label="Address"
                              name="address"/>

                    <FormText v-model="formObj['city']"
                              :required="true"
                              label="City"
                              name="city"/>

                    <FormSelectCountry v-model="formObj['country']"
                                       :required="true"
                                       label="Country"
                                       name="country"/>

                    <FormSelectState v-model="formObj['state']"
                                     :country="formObj['country']"
                                     :required="true"
                                     label="State"
                                     name="state"/>

                    <FormText v-model="formObj['zipcode']"
                              :required="true"
                              label="Zipcode"
                              name="zipcode"/>

                    <FormText v-model="formObj['primary_phone']"
                              :required="true"
                              label="Primary Phone"
                              name="primary_phone"/>
                </div>
            </div>

            <div class="col">
                <div class="border rounded p-3">
                    <FormText v-model="formObj['credit_card_name']"
                              :required="true"
                              label="Name on Credit Card"
                              name="credit_card_name"/>

                    <FormText v-model="formObj['credit_card_number']"
                              :required="true"
                              label="Credit Card Number"
                              max-length="16"
                              name="credit_card_number"/>

                    <div class="row">
                        <div class="col-lg-6">
                            <FormText v-model="formObj['credit_card_month']"
                                      :required="true"
                                      label="Expiration Month"
                                      name="credit_card_month"/>
                        </div>

                        <div class="col-lg-6">
                            <FormText v-model="formObj['credit_card_year']"
                                      :required="true"
                                      label="Expiration Year"
                                      name="credit_card_year"/>
                        </div>
                    </div>

                    <FormText v-model="formObj['credit_card_cvv2']"
                              :required="true"
                              label="CVV2"
                              max-length="4"
                              name="credit_card_cvv2"/>

                    <button class="btn btn-outline-success px-4"
                            type="submit">
                        Create
                    </button>
                </div>
            </div>
        </div>
    </Form>
</template>

<style scoped>

</style>