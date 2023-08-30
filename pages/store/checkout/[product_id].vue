<script lang="ts"
        setup>
import { object, string } from "yup";

const { hasAccess, hasPerm } = useAuthorization();

const { formArr: billingProfiles, getSearch } = useBillingProfile();

const { formObj: couponObj, validateCoupon } = useStoreCoupon();

const { createOrder, formArr, formErrors, formObj, getProduct, getProductPrices } = useStoreProduct();

const route = useRoute();

const cartPrice = ref({
    'base': '0.00',
    'discount': '0.00',
    'setup': '0.00',
    'total': '0.00'
});

const couponSchema = object({
    coupon_code: string().required()
});

const schema = object({
    billing_profile: string().required(),
    coupon: string(),
    store_product_price: string().required()
});

const getTotalPrice = (base_price: number, setup_price: number) => {
    return (setup_price > 0) ? `$${base_price} + $${setup_price} setup fee` : `$${base_price} with no setup fee`;
};

const setCart = (base_price: string, setup_price: string) => {
    const totalPrice = parseFloat(base_price) + parseFloat(setup_price);

    cartPrice.value['base'] = parseFloat(base_price).toFixed(2);
    cartPrice.value['setup'] = parseFloat(setup_price).toFixed(2);
    cartPrice.value['total'] = totalPrice.toFixed(2);
};

const updateCart = (discount_price: string) => {
    const totalPrice = parseFloat(cartPrice.value['total']) - parseFloat(discount_price);

    cartPrice.value['discount'] = parseFloat(discount_price).toFixed(2);
    cartPrice.value['total'] = totalPrice.toFixed(2);
};

definePageMeta({
    description: 'Store Checkout',
    title: 'Store Checkout'
});

onMounted(() => {
    getProduct(route.params['product_id'].toString());

    getProductPrices(route.params['product_id'].toString());

    getSearch();

    hasAccess('client_store_product.view_storeproduct');
});

useHead({
    title: `${route.meta['title']}`
});

watch([couponObj.value], () => {
    updateCart(couponObj.value['amount']);
});
</script>

<template>
    <div class="row g-5">
        <div class="col-md-5 col-lg-4 order-md-last">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-primary">Your cart</span>
            </h4>

            <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-sm bg-light">
                    <div>
                        <div class="my-0 fw-semibold">{{ formObj['store_product']['name'] }}</div>
                    </div>
                </li>

                <li class="list-group-item d-flex justify-content-between">
                    <span>Base price</span>

                    <span class="text-muted">${{ cartPrice['base'] }}</span>
                </li>

                <li class="list-group-item d-flex justify-content-between">
                    <span>Setup fee</span>

                    <span class="text-muted">${{ cartPrice['setup'] }}</span>
                </li>

                <li v-if="couponObj['coupon_is_active']"
                    class="list-group-item d-flex justify-content-between">
                    <div class="text-success">
                        <h6 class="my-0">Promo code</h6>

                        <small>{{ couponObj['coupon_code'] }}</small>
                    </div>

                    <span class="text-success">−${{ couponObj['amount'] }}</span>
                </li>

                <li class="list-group-item d-flex justify-content-between bg-light">
                    <span>Total (USD)</span>

                    <strong>${{ cartPrice['total'] }}</strong>
                </li>
            </ul>

            <div v-if="!couponObj['coupon_is_active'] && formObj['store_product_price'] && hasPerm('client_store_coupon.view_coupon')"
                 class="card p-2">
                <Form :validation-schema="couponSchema"
                      @submit="validateCoupon">
                    <FormText v-model="formObj['coupon_code']"
                              :required="false"
                              label="Coupon Code"
                              name="coupon_code"/>

                    <button class="btn btn-outline-primary px-4"
                            type="submit">Apply
                    </button>
                </Form>
            </div>
        </div>

        <div class="col-md-7 col-lg-8">
            <Form :validation-schema="schema"
                  @submit="createOrder">
                <FormHidden v-model="couponObj['id']"
                            name="coupon"/>

                <FormHidden v-model="route.params['product_id']"
                            name="store_product"/>

                <div class="row">
                    <div class="col-lg-6 mb-3">
                        <div class="mb-3 fw-semibold fs-5">Choose a billing plan:</div>

                        <div class="list-group list-group-checkable">
                            <div v-for="item in formArr"
                                 :key="item">
                                <FormRadioList v-model="formObj['store_product_price']"
                                               :checked=false
                                               :for-name="`store_product_price${item['id']}`"
                                               :label="`${item['billing_cycle']} days`"
                                               :label2="getTotalPrice(item['base_price'], item['setup_price'])"
                                               :value="`${item['id']}`"
                                               name="store_product_price"
                                               @input="setCart(item['base_price'], item['setup_price'])"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3 fw-semibold fs-5">Choose a payment method:</div>

                        <div class="list-group list-group-checkable">
                            <div v-for="item in billingProfiles"
                                 :key="item">
                                <FormRadioList v-model="formObj['billing_profile']"
                                               :checked=false
                                               :for-name="`billing_profile${item['id']}`"
                                               :label="`${item['name']}`"
                                               :value="`${item['id']}`"
                                               name="billing_profile"/>
                            </div>

                            <NuxtLink v-if="hasPerm('client_billing_profile.add_billingprofile')"
                                      class="link-underline link-underline-opacity-0"
                                      to="/billing/profile/create">
                                <input id="billing_profile_new"
                                       class="list-group-item-check"
                                       type="radio">

                                <label class="list-group-item py-3"
                                       for="billing_profile_new"> New Billing Profile </label>
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <hr class="my-4">

                <div v-if="formErrors['non_field_errors']"
                     class="text-danger mb-3">
                    {{ formErrors['non_field_errors'] }}
                </div>

                <button class="w-100 btn btn-success btn-lg"
                        type="submit">Complete Order
                </button>
            </form>
        </div>
    </div>
</template>

<style scoped>

</style>