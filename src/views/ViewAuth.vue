<template>
    <div class="auth">
        <div class="tabs is-centered">
            <ul>
                <li 
                    :class="{'is-active' : !register}"
                >
                    <a @click.prevent="register = false">Login</a>
                </li>

                <li
                    :class="{'is-active' : register}"
                >
                    <a @click.prevent="register = true">Register</a>
                </li>
            </ul>
        </div>

        <!-- Auth Form -->
        <div class="card auth-form">
            
            <div class="card-content">
                <h2 class="has-text-centered title">{{ formTitle }}</h2>
                
                <!-- Form -->
                <form
                    @submit.prevent="onSubmit"
                >                            
                    <!-- Email -->      
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input 
                                class="input" 
                                type="email" 
                                placeholder="Email"
                                v-model="credentials.email"
                            >
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-check"></i>
                            </span>
                        </p>
                    </div>

                        <!-- PassWord -->
                    <div class="field mt-4">
                        <p class="control has-icons-left">
                            <input 
                                class="input" 
                                type="password" 
                                placeholder="Password"
                                v-model="credentials.password"
                            >
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>                           
                        </p>
                    </div>
                        <!-- End Password -->
                    <div class="field is-grouped is-grouped-right">
                        <p class="control">
                            <button class="button is-success is-grouped-right">
                            {{ formTitle }}
                            </button>
                        </p>
                    </div>

                </form>
                <!-- End Form -->
            </div>
        </div>
    </div>
</template>

<script setup>
/*
    imports
*/
    import { ref, computed, reactive } from 'vue'
    import { useStoreAuth } from '@/stores/storeAuth'


/*
    Store Auth
*/
    const storeAuth = useStoreAuth()

/*
    Register / Login
*/
    const register = ref(false)

/*
    Title Login / Register
*/

    const formTitle = computed(() => {
        return (register.value ? 'Register' : 'Login')
    })

/*
    Credentials
*/    
    const credentials = reactive({
        email: '',
        password: ''
    })

/*
    Submit Form
*/
    const onSubmit = () => {
        if (!credentials.email || !credentials.password) {
            alert('Please enter an Email and Password !!!')
        }
        else {
            if (register.value) {
                storeAuth.registerUser(credentials)
            }
            else {
                storeAuth.loginUser(credentials)
                        
            }
        }
    }

</script>

<style scoped>
.auth-form {
    width: 50%;
    margin: 0 auto;
}

</style>