<template>
  <!-- Test simple table -->
  <b-card-code
    title="Request Loan History"
    no-body
  >
    <b-table-simple
      hover
      caption-top
      responsive
      class="rounded-bottom mb-0"
    >
      <b-thead head-variant="light">
        <b-tr>
          <b-th colspan="1">
            Request Date
          </b-th>
          <b-th colspan="2">
            Amount
          </b-th>
          <b-th colspan="2">
            Purpose
          </b-th>
          <b-th colspan="2">
            Actions
          </b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr
          v-for="data in items"
          :key="data.id"
        >
          <b-td colspan="1">
            {{ data.created_at }}
          </b-td>
          <b-td colspan="2">
            {{ data.amount }}
          </b-td>
          <b-td colspan="2">
            {{ data.purpose }}
          </b-td>
          <b-td colspan="2">
            <b-button
              id="delete"
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="outline-danger"
            >
              Delete
            </b-button>
            <span> | </span>
            <b-button
              id="edit"
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="outline-primary"
            >
              Edit
            </b-button>
          </b-td>
        </b-tr>
      </b-tbody>
      <b-tfoot>
        <b-tr>
          <b-td
            colspan="7"
            variant="secondary"
            class="text-right"
          >
            Total Rows: <b>{{ items.length }}</b>
          </b-td>
        </b-tr>
      </b-tfoot>
    </b-table-simple>
    <!-- Modal Form -->
    <b-card-code>
      <!-- modal trigger button -->
      <div class="demo-inline-spacing">
        <b-button
          id="show-btn"
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-primary"
          @click="showModal"
        >
          Request new loan
        </b-button>
      </div>

      <!-- modal -->
      <b-modal
        ref="my-modal"
        hide-footer
        title="Add your new loan!"
      >
        <div class="d-block text-center">
          <!-- Modal body -->
          <b-card-code
            title="Loan Form"
          >
            <b-form>
              <b-row>
                <!-- email -->
                <b-col cols="12">
                  <b-form-group
                    label="Purpose of loan"
                    label-for="v-purpose"
                  >
                    <b-form-input
                      id="v-purpose"
                      v-model="loan.purpose"
                      type="text"
                      placeholder="Purpose of your loan"
                    />
                  </b-form-group>
                </b-col>

                <!-- mobile -->
                <b-col cols="12">
                  <b-form-group
                    label="Amount"
                    label-for="v-amount"
                  >
                    <b-form-input
                      id="v-amount"
                      v-model="loan.amount"
                      type="number"
                      placeholder="Amount of loan"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>

          </b-card-code>
        </div>
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          class="mt-3"
          variant="outline-primary"
          block
          @click="saveRequest"
        >
          Submit Request
        </b-button>
        <b-button
          v-ripple.400="'rgba(234, 84, 85, 0.15)'"
          class="mt-2"
          variant="outline-danger"
          block
          @click="toggleModal"
        >
          Cancel
        </b-button>
      </b-modal>
    </b-card-code>
  </b-card-code>

</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BButton,
  BModal,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BTableSimple,
  BThead,
  BTr,
  BTh,
  BTd,
  BTbody,
  BTfoot,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCardCode,
    BButton,
    BModal,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BTableSimple,
    BThead,
    BTr,
    BTh,
    BTd,
    BTbody,
    BTfoot,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      loan: {
        email: 'jaynard@gmail.com',
        purpose: '',
        amount: 0,
      },
      fields: [
        'created_at',
        'amount',
        'purpose',
        'actions',
      ],
      items: [

      ],
    }
  },
  mounted() {
    axios
      .get('http://127.0.0.1:8000/api/loans')
      .then(res => {
        this.items = res.data
      })
  },
  methods: {
    showModal() {
      this.$refs['my-modal'].show()
    },
    saveRequest() {
      if (this.loan.purpose && this.loan.amount > 0) {
        this.$http.post('/loan', {
          amount: this.loan.amount,
          purpose: this.loan.purpose,
        }).then(res => {
          this.items = res.data
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Successfull!',
              icon: 'EditIcon',
              variant: 'success',
            },
          })
          this.toggleModal()
          this.loan.purpose = ''
          this.loan.amount = 0
        }).catch(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'There was an error in submitting your data!',
              icon: 'EditIcon',
              variant: 'danger',
            },
          })
        })
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Make sure to fill in all the fields!',
            icon: 'EditIcon',
            variant: 'danger',
          },
        })
      }
    },
    toggleModal() {
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
  },
}

</script>
