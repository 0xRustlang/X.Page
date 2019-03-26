<template>
    <b-container fluid class="pt-3">
        <b-container fluid class="p-3 mb-3 bg-white rounded">
            <b-row class="justify-content-center">
                <b-col cols="12" sm="10" md="6" xl="3" class="text-center my-1">
                    <div class="table py-3">
                        <h6 class="category">
                            {{ $t('pricing.headers.free') }}
                        </h6>
                        <h1 class="block-caption" v-html="$t('pricing.prices.free')"></h1>
                        <ul class="text-left">
                            <li>
                                <fa class="mr-2" :icon="['fa', 'check']"></fa> <span v-html="$t('pricing.order.aliveProxy')"></span>
                            </li>
                            <li>
                                <fa class="mr-2" :icon="['fa', 'check']"></fa> <span v-html="$t('pricing.order.bandwidth')"></span>
                            </li>
                            <li>
                                <fa class="mr-2" :icon="['fa', 'check']"></fa> <span v-html="$t('pricing.order.browsers')"></span>
                            </li>
                            <li class="text-muted">
                                <fa class="mr-2" :icon="['fa', 'times']"></fa> <span v-html="$t('pricing.order.fast')"></span>
                            </li>
                            <li class="text-muted">
                                <fa class="mr-2" :icon="['fa', 'times']"></fa> <span v-html="$t('pricing.order.support')"></span>
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
                                <fa class="mr-2" :icon="['fa', 'check']"></fa> <span v-html="$t('pricing.order.aliveProxy')"></span>
                            </li>
                            <li>
                                <fa class="mr-2" :icon="['fa', 'check']"></fa> <span v-html="$t('pricing.order.bandwidth')"></span>
                            </li>
                            <li>
                                <fa class="mr-2" :icon="['fa', 'check']"></fa> <span v-html="$t('pricing.order.browsers')"></span>
                            </li>
                            <li>
                                <fa class="mr-2" :icon="['fa', 'check']"></fa> <span v-html="$t('pricing.order.fastFormatted')"></span>
                            </li>
                            <li>
                                <fa class="mr-2" :icon="['fa', 'check']"></fa> <span v-html="$t('pricing.order.supportFormatted')"></span>
                            </li>
                        </ul>
                        <a href="#" class="btn btn-white btn-round">
                            {{ $t('pricing.order.buy') }}
                        </a>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </b-container>
</template>

<script>
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
</style>
