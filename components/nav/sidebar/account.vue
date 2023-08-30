<script lang="ts"
        setup>
const { hasPerm } = useAuthorization();
</script>

<template>
    <li class="nav-item mt-1" v-if="hasPerm('client_account.view_account')">
        <button aria-expanded="false"
                class="nav-link d-flex align-items-center gap-2"
                data-bs-target="#account-collapse"
                data-bs-toggle="collapse">
            <svg class="bi">
                <use xlink:href="#user-tie"/>
            </svg>

            Account
        </button>

        <div id="account-collapse"
             class="collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li class="ms-3" v-if="hasPerm('client_account.view_accesslog')"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/account/accesslog">
                        <svg class="bi">
                            <use xlink:href="#circle-info"/>
                        </svg>

                        Access Log
                    </NuxtLink>
                </li>

                <li class="ms-3" v-if="hasPerm('client_account.view_account')"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/account/password">
                        <svg class="bi">
                            <use xlink:href="#lock"/>
                        </svg>

                        Password
                    </NuxtLink>
                </li>

                <li class="ms-3" v-if="hasPerm('client_account.view_account')"
                    data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu">
                    <NuxtLink class="nav-link d-flex align-items-center gap-2"
                              to="/account">
                        <svg class="bi">
                            <use xlink:href="#address-card"/>
                        </svg>

                        Profile
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </li>

    <li class="nav-item">
        <NuxtLink class="nav-link d-flex align-items-center gap-2"
                  to="/auth/logout">
            <svg class="bi">
                <use xlink:href="#right-from-bracket"/>
            </svg>

            Sign out
        </NuxtLink>
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