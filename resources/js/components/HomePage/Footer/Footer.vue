<template>
  <footer class="bg-dark px-2 px-lg-4">
        <div class="container-fluid">
            <div class="row text-light py-4">
                <div id="aboutus" class="col-lg-4 col-md-6 col-sm-6 col-12">
                    <h5 class="pb-3">About Us</h5>
                    <p class="small">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do 
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                        sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-6 col-6">
                    <h5 class="pb-3">Visit Us</h5>
                    <ul class="list-unstyled">
                        <li><router-link @click.prevent="scrollToTop" to="/" class="footer-link">
                            Home</router-link></li>
                        <li><router-link to="/login" class="footer-link">Login</router-link></li>
                        <li><router-link to="/register" class="footer-link">Register</router-link></li>
                        <li><router-link to="/cart" class="footer-link">Cart</router-link></li>
                    </ul>
                </div>
                <div id="contactus" class="col-lg-2 col-md-3 col-sm-6 col-6">
                    <h5 class="pb-3">Need Help?</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-uppercase footer-link">Customer Service</a></li>
                        <li><a href="#" class="text-uppercase footer-link">Online Chat</a></li>
                        <li><a href="#" class="text-uppercase footer-link">Support</a></li>
                    </ul>
                </div>
                <div class="col-lg-4 col-md-10 col-12 mt-5 mt-lg-0 mx-auto">
                    <h5 class="pb-3">Get In Touch</h5>
                    <form action="" @submit.prevent="" id="contact-form">
                        <div id="first-form-div" class="form-group form-div">
                            <input type="text" name="" id="name-input" required autocomplete="off" 
                                placeholder="Your Name">
                            <label for="name-input" class="label">Name</label>
                        </div>
                        <div class="form-group form-div">
                            <input type="email" name="" id="email-input" required autocomplete="off" 
                                placeholder="Your Email">
                            <label for="email-input" class="label">Email</label>
                        </div>
                        <div class="form-group form-div">
                          <input type="text" name="" id="message-input" required autocomplete="off" 
                            placeholder="Your Message">
                          <label for="message-input" class="label">Message</label>
                        </div>
                        <button type="submit" class="btn btn-success">POST MESSAGE</button>
                    </form>
                </div>
            </div>
            <div id="copyright" class="row">
              <div class="col text-center text-light border-top pt">
                <p>Copyright &copy; {{ date }} By 
                  <a href="https://fillycoder.com" target="_blank">FILLYCODER LTD</a>.
                </p>
              </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().getFullYear()
    };
  },
  methods: {
    scrollToTop() {
      window.scroll({ top: 0, behavior: 'smooth' });
    }
  }
}
</script>

<style lang="scss" scoped>

  footer {
    width: 100%;
  }

  .footer-link {
    color: #eee;
    font-size: 13px;
    transition: all 0.5s;

    &:hover {
      color: #70aed2;
      text-decoration: none;
    }
  }

  #contact-form {
    #first-form-div {
      margin-top: 0;
    }

    .form-div {
      margin: 3rem 0;

      input {
        display: block;
        border: none;
        border-bottom: 2px solid #fff;
        background: none;
        outline: none;
        width: 100%;
        // margin: 8px 0;
        color: #bebebe;
        transition: all 0.5s ease-in-out;

          &:focus {
            border-bottom: 2px solid #016b86;
          }

          &:placeholder-shown + label {
            transform: translate(20px, 20px);
            opacity: 0;
            visibility: hidden;
          }
      }

      label {
        color: #fff;
        display: block;
        margin-top: -48px;
        font-size: 13px;
        transition: all 0.3s ease-in-out;
      }
    }

    button {
      display: block;
      margin: 1rem 0;
      width: 100%;
      font-weight: 700;
      letter-spacing: 2px;
    }
  }

  #copyright {
    p {
      a {
        text-decoration: none;
        color: #ff6464;
        transition: color 0.5s;
        font-size: 14px;
        font-weight: 600;

        &:hover {
          color: darken(#ff6464, 10%);
        }
      }
    }
  }
</style>