<template>
  <section id="subscribe-section" class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-8 col-lg-5">
        <form class="">
          <span class="small text-white py-3">You can subscribe to our mailbox for newsletters.</span>
          <div class="input-group">
            <input type="email" class="form-control" placeholder="Email Address">
            <div class="input-group-append">
              <button class="btn btn-danger text-white text-uppercase font-weight-bold">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  #subscribe-section {
    // background-color: #376977;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(../../backgrounds/subscribe.jpg) no-repeat center center /cover;
    background-attachment: fixed;
    min-height: 20rem;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .row {
      display: flex;
      justify-content: center;
    }
    
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>