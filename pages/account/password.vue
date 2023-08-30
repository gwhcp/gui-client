<script lang="ts"
        setup>
import { object, string } from "yup";

const { hasAccess, hasPermForm } = useAuthorization();

const { formObj, updatePassword } = useAccount();

const route = useRoute();

const schema = object({
    confirmed_password: string().required().min(5),
    old_password: string().required().min(5),
    password: string().required().min(5)
});

definePageMeta({
    description: 'Account Password',
    title: 'Account Password'
});

onMounted(() => {
    hasAccess('client_account.view_account');

    hasPermForm('client_account.change_account');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonAccount/>

    <Form :validation-schema="schema"
          @submit="updatePassword">
        <div class="row mb-3">
            <div class="col">
                <div class="border rounded p-3">
                    <FormText v-model="formObj['old_password']"
                              :required="true"
                              label="Old Password"
                              name="old_password"
                              type="password"/>

                    <FormText v-model="formObj['password']"
                              :required="true"
                              label="Password"
                              name="password"
                              type="password"/>

                    <FormText v-model="formObj['confirmed_password']"
                              :required="true"
                              label="Confirm Password"
                              name="confirmed_password"
                              type="password"/>

                    <button class="btn btn-outline-primary px-4"
                            type="submit">Update
                    </button>
                </div>
            </div>
        </div>
    </Form>
</template>

<style scoped>

</style>