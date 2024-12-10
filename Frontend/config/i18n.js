import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: {
        translation: {
            welcome_user: "Welcome user",
            logout: "Logout",
            search1: "Search",
            comparison1: "Comparison",
            history: "History",
            best_options: "The best options according to your criteria",
            price: "Price",
            store: "Store",
            no_products_found: "No products found",
            loading: "Loading...",
            virtual_assistant: "Virtual Assistant",
            view_product: "View Product",


            comparison: {
                title: "Product Comparison",
                sort_by_price: "Sort by Price",
                sort_by_rating: "Sort by Rating",
                sort_by_shipping_time: "Sort by Shipping Time",
                name: "Name",
                price: "Price",
                features: "Features",
                store: "Store",
                no_products_selected: "No products selected."
            },
            search: {
                title: "Search Criteria",
                description: "Define your preferences to find the best option.",
                max_budget: "Max Budget",
                select_category: "Select a category",
                category_computers: "Computers and Laptops",
                category_smartphones: "Smartphones",
                category_tablets: "Tablets",
                category_monitors: "Monitors",
                category_accessories: "Accessories",
                category_ram: "RAM Memory",
                category_cpu: "Processor",
                category_gpu: "Graphics Card",
                category_psu: "Power Supply",
                category_case: "Case",
                category_board: "Motherboard",
                category_gadgets: "Gadgets",
                category_network: "Networking",
                brand_placeholder: "Brand (optional)",
                searching: "Searching...",
                search: "Search",
                reset: "Start a New Search",
            },
            error: {
                invalid_budget: "Please enter a valid budget.",
                select_category: "Please select a category.",
                generic: "There was an error while searching for products. Please try again.",
            },
            assistant: {
                welcome_message: "Hello! I'm your virtual assistant. How can I help you today?",
                processing: "I'm looking up the information...",
                response: "Here is the information you requested! Is there anything else I can assist you with?",
                type_message: "Type your message...",
                send: "Send",
                audio_not_supported: "Your browser does not support the audio tag.",
            },

            login:{
                loginTitle: 'Login',
                emailPlaceholder: 'Email',
                passwordPlaceholder: 'Password',
                loginButton: 'Login',
                googleLoginButton: 'Login with Google',
                facebookLoginButton: 'Login with Facebook',
                forgotPassword: 'Forgot your password?',
                noAccount: "Don't have an account?",
                register: 'Register',
                errorLogin: 'Incorrect credentials. Please try again.',
                errorGeneral: 'An error occurred while logging in.',
                errorGoogle: 'Failed to login with Google.',
                errorFacebook: 'Failed to login with Facebook.',
                errorRecovery: 'Failed to send recovery email.',
              },

              register: {
                title: 'Register',
                fullName: 'Full Name',
                email: 'Email',
                password: 'Password',
                confirmPassword: 'Confirm Password',
                registerButton: 'Register',
                alreadyHaveAccount: 'Already have an account?',
                loginButton: 'Login',
                passwordMismatch: "Passwords do not match.",
                nameRequired: "Full name is required.",
                invalidEmail: "Please enter a valid email address.",
                passwordLength: "Password must be at least 8 characters long.",
                successMessage: "Registration successful. Redirecting to login...",
                errorGeneral: "An error occurred during registration.",
                networkError: "Network error: ",
              },

              history1: {
                history: "History",
                delete: "Delete",
                no_searches: "No searches in history.",
                search1: "Search 1",
                search2: "Search 2",
                search3: "Search 3",
                user: "User",
                bot: "Bot",
              }

        },
    },
    es: {
        translation: {
            welcome_user: "Bienvenido usuario",
            logout: "Cerrar sesión",
            search1: "Búsqueda",
            comparison1: "Comparación",
            history: "Historial",
            best_options: "Las mejores opciones según tus criterios",
            price: "Precio",
            store: "Tienda",
            no_products_found: "No se han encontrado productos",
            loading: "Cargando...",
            virtual_assistant: "Asistente Virtual",
            view_product: "Ver producto",

            comparison: {
                title: "Tabla Comparativa de Productos",
                sort_by_price: "Ordenar por Precio",
                sort_by_rating: "Ordenar por Calificación",
                sort_by_shipping_time: "Ordenar por Tiempo de Envío",
                name: "Nombre",
                price: "Precio",
                features: "Características",
                store: "Tienda",
                no_products_selected: "No hay productos seleccionados."
            },
            search: {
                title: "Criterios de búsqueda",
                description: "Define tus preferencias para encontrar la mejor opción.",
                max_budget: "Presupuesto máximo",
                select_category: "Selecciona una categoría",
                category_computers: "Computadoras y laptops",
                category_smartphones: "Smartphones",
                category_tablets: "Tablets",
                category_monitors: "Monitores",
                category_accessories: "Accesorios",
                category_ram: "Memoria RAM",
                category_cpu: "Procesador",
                category_gpu: "Tarjeta Gráfica",
                category_psu: "Fuente de poder",
                category_case: "Gabinete",
                category_board: "Placa Base",
                category_gadgets: "Gadgets",
                category_network: "Redes",
                brand_placeholder: "Marca (opcional)",
                searching: "Buscando...",
                search: "Buscar",
                reset: "Realizar una nueva búsqueda",
            },
            error: {
                invalid_budget: "Por favor, ingresa un presupuesto válido.",
                select_category: "Por favor, selecciona una categoría.",
                generic: "Hubo un error al buscar productos. Por favor, intenta nuevamente.",
            },

            assistant: {
                welcome_message: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
                processing: "Estoy buscando la información...",
                response: "¡Aquí está la información que buscas! ¿Necesitas algo más?",
                type_message: "Escribe tu mensaje...",
                send: "Enviar",
                audio_not_supported: "Tu navegador no soporta la etiqueta de audio.",
            },

            login: {
                loginTitle: 'Iniciar sesión',
                emailPlaceholder: 'Correo electrónico',
                passwordPlaceholder: 'Contraseña',
                loginButton: 'Iniciar sesión',
                googleLoginButton: 'Iniciar con Google',
                facebookLoginButton: 'Iniciar con Facebook',
                forgotPassword: '¿Olvidaste tu contraseña?',
                noAccount: '¿No tienes cuenta?',
                register: 'Regístrate',
                errorLogin: 'Credenciales incorrectas. Por favor, intenta de nuevo.',
                errorGeneral: 'Ocurrió un error al iniciar sesión.',
                errorGoogle: 'No se pudo iniciar sesión con Google.',
                errorFacebook: 'No se pudo iniciar sesión con Facebook.',
                errorRecovery: 'No se pudo enviar el correo de recuperación.',
              },
            
              register: {
                title: 'Registro',
                fullName: 'Nombre Completo',
                email: 'Correo Electrónico',
                password: 'Contraseña',
                confirmPassword: 'Confirmar Contraseña',
                registerButton: 'Registrarse',
                alreadyHaveAccount: '¿Ya tienes cuenta?',
                loginButton: 'Iniciar sesión',
                passwordMismatch: "Las contraseñas no coinciden.",
                nameRequired: "El nombre completo es obligatorio.",
                invalidEmail: "Por favor, ingresa un correo electrónico válido.",
                passwordLength: "La contraseña debe tener al menos 8 caracteres.",
                successMessage: "Registro exitoso. Redirigiendo al inicio de sesión...",
                errorGeneral: "Ocurrió un error durante el registro.",
                networkError: "Error de red: ",
              },
              
              history1: {
                history: "Historial",
                delete: "Eliminar",
                no_searches: "No hay búsquedas en el historial.",
                search1: "Búsqueda 1",
                search2: "Búsqueda 2",
                search3: "Búsqueda 3",
                user: "Usuario",
                bot: "Bot",
              }
       

        },
    },
};

i18n
    .use(LanguageDetector) // Detecta el idioma del navegador
    .use(initReactI18next) // Inicializa con React
    .init({
        resources,
        fallbackLng: "es", // Idioma predeterminado
        interpolation: {
            escapeValue: false, // React ya maneja el escape de valores
        },
    });

export default i18n;
