<template>
    <b-modal id="authModal" ref="authModal" hide-footer :title="$t('auth.title')">
        <div class="text-center social-btns">
            <b-button-group>
                <b-button class="rounded-circle google" @click="requestAuth('google')">
                    <fa :icon="['fab', 'google']" class="icon-default"></fa>
                </b-button>
                <b-button class="rounded-circle facebook" @click="requestAuth('facebook')">
                    <fa :icon="['fab', 'facebook-f']" class="icon-default"></fa>
                </b-button>
                <b-button class="rounded-circle vk" @click="requestAuth('vk')">
                    <fa :icon="['fab', 'vk']" class="icon-default"></fa>
                </b-button>
                <b-button class="rounded-circle yandex" @click="requestAuth('yandex')">
                    <fa :icon="['fab', 'yandex']" class="icon-default"></fa>
                </b-button>
            </b-button-group>
        </div>
    </b-modal>
</template>

<script>
    export default {
        name: 'AuthModalComponent',
        methods: {
            requestAuth(provider) {
                const width = screen.width / 2;
                const height = screen.height / 2;

                const x = (screen.width - width) / 2;
                const y = (screen.height - height) / 2;

                const win = window.open('', '_blank', `top=${y}, left=${x}, width=${width}, height=${height}`);

                const watcher = () => {
                    if (!win.closed) {
                        setTimeout(watcher, 100);
                    } else {
                        this.$store.commit('user/setCredentials', { credentials: this.$cookies.get('credentials') });
                        this.$refs.authModal.hide();
                    }
                };

                this.$store.dispatch('user/requestAuth', provider).then(response => win.location.href = response);

                setTimeout(watcher, 100);
            }
        }
    }
</script>

<style lang="scss">
    .social-btns {
        .btn {
            width: 70px;
            height: 70px;
            padding: 10px 16px;
            border-radius: 35px;
            font-size: 24px;
            line-height: 1.28;
            border: none;
            margin: 0 10px;
            &.google {
                background-color: #dd4b39;
            }
            &.facebook {
                background-color: #3b5998;
            }
            &.vk {
                background-color: #587ea3;
            }
            &.yandex {
                background-color: #ffb300;
            }
        }
    }
</style>