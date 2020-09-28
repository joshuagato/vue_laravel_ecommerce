<template>
  <div id="register-div">
    <div class="register-box moveFromFront">
      <h2 class="text-center moveFromTop">REGISTRATION</h2>
      <p class="text-light moveFromTop"><FontAwesomeIcon icon="users" size="4x" /></p>
      <p class="messages-area">
        <span id="error-message" v-if="errorMsg">{{ errorMsg }}</span>
        <span id="success-message" v-if="successMsg">{{ successMsg }}</span>
      </p>
      <form @submit.prevent="submit">
        <section class="input-section">
          <div class="input-group my-3 moveFromLeft">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon="user-secret" /></span>
            </div>
            <input type="text" class="form-control" placeholder="Name" aria-label="Name"
              aria-describedby="basic-addon1" v-model="formData.name" autocomplete="new-password">
          </div>
          <div class="input-group my-3 moveFromRight">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon2"><FontAwesomeIcon icon="user" /></span>
            </div>
            <input type="email" class="form-control" placeholder="Email" aria-label="Email"
              aria-describedby="basic-addon2" v-model="formData.email" autocomplete="new-password">
          </div>
          <div class="input-group my-3 moveFromLeft">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon3"><FontAwesomeIcon icon="unlock-alt" /></span>
            </div>
            <input type="password" class="form-control" placeholder="Password" aria-label="Password"
              aria-describedby="basic-addon3" v-model="formData.password" autocomplete="new-password">
          </div>
          <div class="input-group my-3 moveFromRight">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon4"><FontAwesomeIcon icon="lock" /></span>
            </div>
            <input type="password" class="form-control" placeholder="Confirm Password" aria-label="Password"
              aria-describedby="basic-addon4" v-model="formData.confirmPassword" autocomplete="new-password">
          </div>
          <div class="input-group my moveFromBottom">
            <input type="submit" class="form-control btn btn-success" value="REGISTER" aria-label="Login">
          </div>
        </section>
      </form> 
    </div>   
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  computed: {
    ...mapState('auth', {
      errorMsg: 'errorMsg',
      successMsg: state => state.successMsg
    })
  },
  methods: {
    ...mapActions({
      signUpAction: 'auth/signUp',
      resetMessagesAction: 'auth/resetMessages'
    }),
    
    submit() {
      this.signUpAction(this.formData).then(() => {
        setTimeout(() => {
          this.resetMessagesAction();
          this.$router.replace('/login');
        }, 4000);
      })
      .catch(() => {
        // 
      });
    }
  },
  mounted() {
    document.body.style.overflow = "hidden";
  },
  destroyed() {
    document.body.style.overflow = "auto";
  }
}
</script>

<style lang="scss" scoped>
  @media (min-width: 768px) and (orientation: landscape) {
    .input-section {
      width: 400px;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) and (orientation: portrait) {
    #register-div {
      padding: 0 4rem;

      .register-box {
        width: 90%;

        form {
          width: 100%;
        }
      }
    }
  }

  @media (max-width: 575.97px) and (orientation: portrait) {
    #register-div {
      padding: 0 1rem;

      .register-box {
        width: 100%;

        form {
          width: 100%;
        }
      }
    }
  }

  #register-div {
    background: linear-gradient(rgba(35, 83, 172, 0.5), rgba(35, 83, 172, 0.3));
    padding-top: 4rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .register-box {
      background: linear-gradient(rgba(214, 242, 255, 0.5), rgba(218, 235, 255, 0.3));
      height: 85vh;
      padding: 1rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h2 {
        color: #2f4053;
      }

      .messages-area {
        #error-message {
          text-align: center;
          color: crimson;
        }

        #success-message {
          text-align: center;
          color: darkgreen;
        }
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

    .moveFromBottom {
      animation-name: moveFromBottom;
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
      };

      to { 
        transform: scale(1);
        opacity: 1;
        visibility: visible;
      };
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

    @keyframes moveFromLeft {
      0% {
        transform: translateX(-40px);
        opacity: 0;
      }

      100% {
        transform: translateX(0);
        opacity: 1;
        visibility: visible;
      }
    }

    @keyframes moveFromRight {
      0% {
        transform: translateX(40px);
        opacity: 0;
      }

      100% {
        transform: translateX(0);
        opacity: 1;
        visibility: visible;
      }
    }
  }
</style>