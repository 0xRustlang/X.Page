<template>
    <b-container class="content pt-3">
        <b-row class="gateways">
            <b-col md="4" class="order-md-2 mb-4">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">{{ $t('pricing.order.details.title') }}</span>
                    <span class="badge badge-secondary badge-pill">1</span>
                </h4>
                <b-list-group class="mb-3">
                    <b-list-group-item class="d-flex justify-content-between lh-condensed">
                        <b-form-select v-model="currency" :options="currencies"></b-form-select>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">{{ $t('pricing.order.details.premium.name') }}</h6>
                            <small class="text-muted">{{ $t('pricing.order.details.premium.description') }}</small>
                        </div>
                        <span class="text-muted">{{ prices[currency] | currency(currency) }}</span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between lh-condensed">
                        <div class="text-success">
                            <h6 class="my-0">{{ $t('pricing.order.details.promo.section') }}</h6>
                        </div>
                        <span class="text-success">-{{ 0 | currency(currency) }}</span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between lh-condensed">
                        <span>{{ $t('pricing.order.details.total') }}</span>
                        <strong>{{ prices[currency] | currency(currency) }}</strong>
                    </b-list-group-item>
                </b-list-group>
                <b-input-group>
                    <b-form-input :placeholder="$t('pricing.order.details.promo.section')" disabled></b-form-input>
                    <b-input-group-append>
                        <b-button variant="outline-primary" disabled>{{ $t('pricing.order.details.promo.redeem') }}</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
            <b-col md="8" class="order-md-1">
                <h4 class="my-3">{{ $t('pricing.order.gateway') }}</h4>
                <b-row>
                    <b-col md="6" class="mb-3">
                        <b-btn variant="primary" @click="purchase('card')" v-bind:class="{ active: gateway === 'card' }" class="w-100 gateway text-light">
                            <fa :icon="['fab', 'cc-visa']"></fa>
                            <fa :icon="['fab', 'cc-mastercard']"></fa>
                        </b-btn>
                    </b-col>
                    <b-col md="6" class="mb-3">
                        <b-btn variant="primary" @click="purchase('paypal')" v-bind:class="{ active: gateway === 'paypal' }" class="w-100 gateway text-light">
                            <fa :icon="['fab', 'paypal']"></fa> PayPal
                        </b-btn>
                    </b-col>
                </b-row>
                <hr class="my-4">
                <b-row class="justify-content-center">
                    <b-link :disabled="hasRedirectTo() === false" :href="redirectGateway" target="_blank" class="btn btn-warning py-3 px-4">
                        <fa :icon="['fa', 'shopping-cart']"></fa> {{ $t('pricing.order.pay') }}
                    </b-link>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import { mapState } from 'vuex'
    import { CURRENCY_RUB, CURRENCY_USD } from "@/store/billing"

    export default {
        head() {
            return {
                title: this.$i18n.t('metadata.title.checkout'),
                meta: [
                    {
                        name: 'description',
                        content: this.$i18n.t('metadata.description.checkout')
                    },
                    {
                        name: 'keywords',
                        content: this.$i18n.t('metadata.keywords.checkout')
                    }
                ]
            }
        },
        computed: {
            ...mapState({
                gateway: state => state.billing.gateway,
                redirectTo: state => state.billing.redirectTo
            }),
            currency: {
                get() {
                    return this.$store.state.billing.currency;
                },
                set(value) {
                    this.$store.commit('billing/setCurrency', value);

                    if (this.gateway.length > 0) {
                        if (!this.hasRedirectTo()) {
                            this.tryPurchase();
                        }
                    }
                }
            },
            redirectGateway() {
                if (this.hasRedirectTo()) {
                    const newURL = new URL(this.redirectTo[this.currency]);

                    newURL.pathname += '/';
                    newURL.pathname += this.gateway;

                    return newURL.toString();
                }
            }
        },
        data() {
            return {
                currencies: [
                    CURRENCY_RUB,
                    CURRENCY_USD
                ],
                prices: {
                    [CURRENCY_RUB]: 120,
                    [CURRENCY_USD]: 2
                }
            }
        },
        methods: {
            purchase(gateway) {
                this.$store.commit('billing/setGateway', gateway);

                if (!this.hasRedirectTo()) {
                    this.tryPurchase();
                }
            },
            hasRedirectTo() {
                return this.redirectTo.hasOwnProperty(this.currency);
            },
            tryPurchase() {
                const fn = ({ response }) => {
                    if (response.status === 401) {
                        this.$root.$emit('bv::show::modal', 'authModal');
                    }
                };

                this.$store.dispatch('billing/purchase').catch(fn);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .gateways {
        .gateway {
            font-size: 1.5em;
            font-style: italic;
            border: none;
            &.active {
                box-shadow: 0 14px 26px -12px rgba(233, 30, 99, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(233, 30, 99, 0.2);
            }
        }
    }
</style>
