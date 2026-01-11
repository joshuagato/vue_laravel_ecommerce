<template>
    <div id="login-div">
        <div class="login-box moveFromFront">
            <h2 class="text-center moveFromTop">MEMBER LOGIN</h2>
            <p class="text-light moveFromTop">
                <FontAwesomeIcon icon="users" size="4x" />
            </p>
            <form @submit.prevent="submit">
                <section class="input-section">
                    <div class="input-group my-3 moveFromLeft">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1"
                                ><FontAwesomeIcon icon="user"
                            /></span>
                        </div>
                        <input
                            type="email"
                            class="form-control"
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            v-model="credentials.email"
                            autocomplete="new-password"
                        />
                    </div>
                    <div class="input-group my-3 p moveFromRight">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon2"
                                ><FontAwesomeIcon icon="unlock"
                            /></span>
                        </div>
                        <input
                            type="password"
                            class="form-control"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon2"
                            v-model="credentials.password"
                            autocomplete="new-password"
                        />
                    </div>
                    <div class="input-group my-3 moveFromBottom">
                        <input
                            type="submit"
                            class="form-control btn btn-success"
                            value="LOG IN"
                            aria-label="Login"
                        />
                    </div>
                </section>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            credentials: {
                email: "",
                password: ""
            }
        };
    },
    methods: {
        ...mapActions({
            signIn: "auth/signIn"
        }),
        submit() {
            this.signIn(this.credentials)
                .then(() => {
                    this.$router.replace("/");
                })
                .catch(() => {
                    console.log("Failed.");
                });
        }
    },
    mounted() {
        document.body.style.overflow = "hidden";
    },
    destroyed() {
        document.body.style.overflow = "auto";
    }
};
</script>

<style lang="scss" scoped>
@media (min-width: 768px) and (orientation: landscape) {
    .input-section {
        width: 400px;
    }
}

@media (min-width: 768px) and (max-width: 991.98px) and (orientation: portrait) {
    #login-div {
        padding: 0 4rem;

        .login-box {
            width: 90%;

            form {
                width: 100%;
            }
        }
    }
}

@media (max-width: 575.97px) and (orientation: portrait) {
    #login-div {
        padding: 0 1rem;

        .login-box {
            width: 100%;

            form {
                width: 100%;
            }
        }
    }
}

#login-div {
    background: linear-gradient(
        rgba(74, 106, 165, 0.5),
        rgba(76, 108, 168, 0.3)
    );
    // background-color: #eaf2ff;
    // background-color: rgba(232, 235, 240, 0.3);
    padding-top: 1rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .login-box {
        background: linear-gradient(
            rgba(214, 242, 255, 0.5),
            rgba(218, 235, 255, 0.3)
        );
        height: 80vh;
        padding: 1rem;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h2 {
            color: #2f4053;
        }

        span.input-group-text {
            background-color: #2f4053;

            svg {
                color: #fff;
            }
        }
    }

    .moveFromTop {
        animation-name: moveFromTop;
        animation-duration: 1.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
        visibility: hidden;
    }

    .moveFromLeft {
        animation-name: moveFromLeft;
        animation-duration: 1.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
        visibility: hidden;
    }

    .moveFromBottom {
        animation-name: moveFromBottom;
        animation-duration: 1.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
        visibility: hidden;
    }

    .moveFromRight {
        animation-name: moveFromRight;
        animation-duration: 1.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
        visibility: hidden;
    }

    .moveFromFront {
        animation-name: moveFromFront;
        animation-duration: 0.3s;
        animation-fill-mode: forwards;
        visibility: hidden;
    }

    @keyframes moveFromFront {
        from {
            transform: scale(1.5);
            opacity: 0;
        }

        to {
            transform: scale(1);
            opacity: 1;
            visibility: visible;
        }
    }

    @keyframes moveFromBottom {
        0% {
            transform: translateY(40px);
            opacity: 0;
        }

        100% {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
    }

    @keyframes moveFromLeft {
        from {
            transform: translateX(-40px);
            opacity: 0;
        }

        to {
            transform: translateX(0);
            opacity: 1;
            visibility: visible;
        }
    }

    @keyframes moveFromTop {
        0% {
            transform: translateY(-40px);
            opacity: 0;
        }

        100% {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
    }

    @keyframes moveFromRight {
        from {
            transform: translateX(40px);
            opacity: 0;
        }

        to {
            transform: translateX(0);
            opacity: 1;
            visibility: visible;
        }
    }
}
</style>
