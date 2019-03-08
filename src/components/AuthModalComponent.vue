<template>
    <b-modal id="authModal" ref="authModal" hide-header hide-footer title="Auth">
        <h2 class="text-center">{{ $t('signin') }}</h2>
        <div class="text-center social-btns">
            <b-button block class="google" @click="requestAuth('google')">
                <span><font-awesome-icon :icon="['fab', 'google']"></font-awesome-icon></span>
                {{ $t('signin-with') }} <strong>Google</strong>
            </b-button>
            <b-button block class="facebook" @click="requestAuth('facebook')">
                <span><font-awesome-icon :icon="['fab', 'facebook-f']"></font-awesome-icon></span>
                {{ $t('signin-with') }} <strong>Facebook</strong>
            </b-button>
            <b-button block class="vk" @click="requestAuth('vk')">
                <span><font-awesome-icon :icon="['fab', 'vk']"></font-awesome-icon></span>
                {{ $t('signin-with') }} <strong>VK</strong>
            </b-button>
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
                this.$store.dispatch('user/requestAuth', provider).then(response => win.location.href = response);

                const refresher = () => {
                    if (!win.closed) {
                        setTimeout(refresher, 100);
                    } else {
                        this.$store.dispatch('user/sync');
                        this.$refs.authModal.hide();
                    }
                };

                setTimeout(refresher, 100);
            }
        }
    }
</script>

<style lang="scss">
    .social-btns .btn {
        position: relative;
        border-color: rgba(0,0,0,0.2);
        color: #fff;

        & > span {
            text-align: center;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            padding: 0.35em;
            width: 40px;
            border-right: 1px solid rgba(0,0,0,0.3);
        }

        &.google {
            background-color: #dd4b39;
            &:hover {
                background-color:#c23321;
            }
        }

        &.facebook {
            background-color: #3b5998;
            &:hover {
                background-color:#2d4373;
            }
        }

        &.vk {
            background-color: #587ea3;
            &:hover {
                background-color:#466482;
            }
        }
    }
</style>