<script lang="ts"
        setup>
const { hasPerm } = useAuthorization();
</script>

<template>
    <li v-if="hasPerm('client_store_product.view_storeproduct')"
        class="nav-item mt-1">
        <button aria-expanded="false"
                class="nav-link d-flex align-items-center gap-2"
                data-bs-target="#store-collapse"
                data-bs-toggle="collapse">
            <svg class="bi">
                <use xlink:href="#shop"/>
            </svg>

            Store
        </button>

        <div id="store-collapse"
             class="collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li v-if="hasPerm('client_store_product.view_storeproduct')"
                    class="ms-3"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/store">
                        <svg class="bi">
                            <use xlink:href="#magnifying-glass"/>
                        </svg>

                        Search
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </li>
</template>

<style scoped>
.bi {
    display: inline-block;
    width: 1rem;
    height: 1rem;
}

.nav-link {
    font-size: .875rem;
    font-weight: 500;
}

.nav .nav-item .nav-link {
    color: #000000;
}

.nav .nav-item .nav-link:hover {
    color: #FE541F;
}

/* Nav Bar */
.navbar-nav .nav-item .nav-link {
    color: #000000;
}

.navbar-nav .nav-item .nav-link:hover {
    color: #FE541F;
}
</style>