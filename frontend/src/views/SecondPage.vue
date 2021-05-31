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
          v-for="data in allItems"
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
              @click="deleteRequest(data.id)"
            >
              Delete
            </b-button>
            <span> | </span>
            <b-button
              id="edit"
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="outline-primary"
              @click="editLoan(data.id)"
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
            Total Rows: <b>{{ allItems.length }}</b>
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
          @click="newLoan"
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
                      autocomplete="off"
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
          v-if="!update"
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          class="mt-3"
          variant="outline-primary"
          block
          @click="saveRequest"
        >
          Submit Request
        </b-button>
        <b-button
          v-if="update"
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          class="mt-3"
          variant="outline-primary"
          block
          @click="updateRequest"
        >
          Update Request
        </b-button>
        <b-button
          v-ripple.400="'rgba(234, 84, 85, 0.15)'"
          class="mt-2"
          variant="outline-danger"
          block
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
// import axios from 'axios'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapGetters, mapActions } from 'vuex'

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
      selectedId: 0,
      update: false,
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
    }
  },
  computed: mapGetters(['allItems']),
  created() {
    this.fetchLoanRequest()
  },
  methods: {
    ...mapActions(['fetchLoanRequest', 'addRequest', 'deleteRequest', 'editLoanRequest']),
    newLoan() {
      this.update = false
      this.loan.purpose = ''
      this.loan.amount = 0
      this.showModal()
    },
    toastErrorMessage(message) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: message,
          icon: 'EditIcon',
          variant: 'danger',
        },
      })
    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    toggleModal() {
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    saveRequest() {
      if (this.loan.purpose && this.loan.amount > 0) {
        this.addRequest(this.loan)
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
      } else {
        this.toastErrorMessage('Make sure to fill in all the fields and should be greater than zero!')
      }
    },
    deleteLoan(id) {
      this.deleteRequest(id)
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Successfully deleted!',
          icon: 'EditIcon',
          variant: 'success',
        },
      })
    },
    editLoan(id) {
      this.selectedId = id
      this.update = true
      const myLoan = this.allItems.find(loan => loan.id === id)
      this.loan.purpose = myLoan.purpose
      this.loan.amount = myLoan.amount
      this.showModal()
    },
    updateRequest() {
      if (this.loan.purpose && this.loan.amount > 0) {
        this.loan.id = this.selectedId
        this.editLoanRequest(this.loan)
        this.toggleModal()
      } else {
        this.toastErrorMessage('Make sure to fill in all the fields and should be greater than zero!')
      }
    },
  },
  // methods: {
  //   deleteLoan(id) {
  //     this.$http.delete(`/loan/${id}`).then(() => {
  //       const index = this.items.findIndex(loan => loan.id === id)
  //       this.items.splice(index, 1)
  //     })
  //   },
  // },
}

</script>
