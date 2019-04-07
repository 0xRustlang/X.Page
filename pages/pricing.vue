<template>
    <b-container fluid class="content pt-3">
        <b-container fluid class="p-3 mb-3 bg-white rounded">
            <b-row class="justify-content-center" v-show="step === 0">
                <b-col cols="12" sm="10" md="6" xl="3" class="text-center my-1">
                    <div class="table py-3">
                        <h6 class="category">
                            {{ $t('pricing.headers.free') }}
                        </h6>
                        <h1 class="block-caption" v-html="$t('pricing.prices.free')"></h1>
                        <ul class="text-left">
                            <li>
                                <fa :icon="['fa', 'check']"></fa> <span v-html="$t('pricing.order.aliveProxy')"></span>
                            </li>
                            <li>
                                <fa :icon="['fa', 'check']"></fa> <span v-html="$t('pricing.order.bandwidth')"></span>
                            </li>
                            <li>
                                <fa :icon="['fa', 'check']"></fa> <span v-html="$t('pricing.order.browsers')"></span>
                            </li>
                            <li class="text-muted">
                                <fa :icon="['fa', 'times']"></fa> <span v-html="$t('pricing.order.fast')"></span>
                            </li>
                            <li class="text-muted">
                                <fa :icon="['fa', 'times']"></fa> <span v-html="$t('pricing.order.support')"></span>
                            </li>
                        </ul>
                        <a href="#" class="btn btn-primary btn-round">
                            {{ $t('pricing.order.download') }}
                        </a>
                    </div>
                </b-col>
                <b-col cols="12" sm="10" md="6" xl="3" class="text-light text-center my-1">
                    <div class="table table-primary py-3">
                        <h6 class="category">
                            {{ $t('pricing.headers.premium') }}
                        </h6>
                        <h1 class="block-caption" v-html="$t('pricing.prices.premium')"></h1>
                        <ul class="text-left">
                            <li>
                                <fa :icon="['fa', 'check']"></fa> <span v-html="$t('pricing.order.aliveProxy')"></span>
                            </li>
                            <li>
                                <fa :icon="['fa', 'check']"></fa> <span v-html="$t('pricing.order.bandwidth')"></span>
                            </li>
                            <li>
                                <fa :icon="['fa', 'check']"></fa> <span v-html="$t('pricing.order.browsers')"></span>
                            </li>
                            <li>
                                <fa :icon="['fa', 'check']"></fa> <span v-html="$t('pricing.order.fastFormatted')"></span>
                            </li>
                            <li>
                                <fa :icon="['fa', 'check']"></fa> <span v-html="$t('pricing.order.supportFormatted')"></span>
                            </li>
                        </ul>
                        <b-btn class="btn-white btn-round" @click="step++">
                            {{ $t('pricing.order.buy') }}
                        </b-btn>
                    </div>
                </b-col>
            </b-row>
            <b-container>
                <b-row class="gateways" v-show="step === 1">
                    <b-col md="4" class="order-md-2 mb-4">
                        <h4 class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-muted">{{ $t('pricing.order.details.title') }}</span>
                            <span class="badge badge-secondary badge-pill">1</span>
                        </h4>
                        <ul class="list-group mb-3">
                            <li class="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 class="my-0">{{ $t('pricing.order.details.premium.name') }}</h6>
                                    <small class="text-muted">{{ $t('pricing.order.details.premium.description') }}</small>
                                </div>
                                <span class="text-muted">{{ $t('pricing.order.details.price') }}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between bg-light">
                                <div class="text-success">
                                    <h6 class="my-0">{{ $t('pricing.order.details.promo.section') }}</h6>
                                </div>
                                <span class="text-success">-{{ $t('pricing.order.details.discount') }}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span>{{ $t('pricing.order.details.total') }}</span>
                                <strong>{{ $t('pricing.order.details.price') }}</strong>
                            </li>
                        </ul>
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
                                <b-btn @click="purchase('card')" v-bind:class="{ active: gateway === 'card' }" class="w-100 gateway text-light">
                                    <fa :icon="['fab', 'cc-visa']"></fa>
                                    <fa :icon="['fab', 'cc-mastercard']"></fa>
                                </b-btn>
                            </b-col>
                            <b-col md="6" class="mb-3">
                                <b-btn @click="purchase('paypal')" v-bind:class="{ active: gateway === 'paypal' }" class="w-100 gateway text-light">
                                    <fa :icon="['fab', 'paypal']"></fa> PayPal
                                </b-btn>
                            </b-col>
                        </b-row>
                        <hr class="my-4">
                        <b-row class="justify-content-center">
                            <b-link :disabled="redirectTo.length === 0" :href="redirectGateway" target="_blank" class="btn btn-warning py-3 px-4">
                                <fa :icon="['fa', 'shopping-cart']"></fa> {{ $t('pricing.order.pay') }}
                            </b-link>
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </b-container>
    </b-container>
</template>

<script>
    import { mapState } from 'vuex'
    import { CURRENCY_RUB, CURRENCY_USD } from "@/store/billing"

    export default {
        head() {
            return {
                title: this.$i18n.t('metadata.title.pricing'),
                meta: [
                    {
                        name: 'description',
                        content: this.$i18n.t('metadata.description.pricing')
                    },
                    {
                        name: 'keywords',
                        content: this.$i18n.t('metadata.keywords.pricing')
                    }
                ]
            }
        },
        data() {
            return {
                step: 0
            }
        },
        computed: {
            ...mapState({
                currency: state => state.billing.currency,
                gateway: state => state.billing.gateway,
                redirectTo: state => state.billing.redirectTo
            }),
            redirectGateway() {
                if (this.redirectTo.length > 0) {
                    const newURL = new URL(this.redirectTo);

                    newURL.pathname += '/';
                    newURL.pathname += this.gateway;

                    return newURL.toString();
                }
            }
        },
        methods: {
            purchase(gateway) {
                this.$store.commit('billing/setGateway', gateway);

                if (this.redirectTo.length === 0) {
                    const fn = ({ response }) => {
                        if (response.status === 401) {
                            this.$root.$emit('bv::show::modal', 'authModal');
                        }
                    };

                    this.$store.dispatch('billing/purchase').catch(fn);
                }
            }
        },
        mounted() {
            this.$store.commit('billing/setCurrency', this.$i18n.locale === this.$i18n.defaultLocale ? CURRENCY_RUB : CURRENCY_USD);
        }
    }
</script>

<style lang="scss" scoped>
    .table {
        height: 100%;
        border-radius: 6px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        &.table-primary {
            background: linear-gradient(60deg, #554fe8, #c2185b);
            box-shadow: 0 14px 26px -12px rgba(233, 30, 99, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(233, 30, 99, 0.2);
            ul {
                li {
                    border-color: rgba(255, 255, 255, 0.3);
                }
            }
        }
        h6.category {
            font-size: 1.0em;
            text-transform: uppercase;
            font-weight: 700;
        }
        h1.block-caption {
            font-size: 3.8em;
            line-height: 1.15em;
            font-weight: 700;
            margin-top: 30px;
            /deep/ small {
                position: relative;
                top: -17px;
                font-size: 26px;
            }
        }
        ul {
            list-style: none;
            padding: 0;
            max-width: 260px;
            margin: 10px auto;
            li {
                line-height: 2em;
                padding: 12px 0;
                border-bottom: 1px solid rgba(153, 153, 153, 0.3);
                svg {
                    width: 2em;
                }
            }
        }
        .btn {
            position: relative;
            padding: 12px 30px;
            margin: 10px 1px;
            font-size: 12px;
            font-weight: 400;
            text-transform: uppercase;
            letter-spacing: 0;
            will-change: box-shadow, transform;
            transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            &.btn-white {
                color: #3C4857;
                background-color: #fff;
                border-color: #fff;
                box-shadow: 0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12);
            }
            &.btn-primary {
                background: linear-gradient(60deg, #554fe8, #a94fe8);
                border: none;
            }
            &.btn-round {
                border-radius: 30px;
            }
        }
    }

    .gateways {
        .gateway {
            font-size: 1.5em;
            font-style: italic;
            background: linear-gradient(60deg, #554fe8, #a94fe8);
            border: none;
            &.active {
                box-shadow: 0 14px 26px -12px rgba(233, 30, 99, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(233, 30, 99, 0.2);
            }
        }
    }
</style>
