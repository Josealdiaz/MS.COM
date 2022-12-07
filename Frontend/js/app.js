const app= Vue.createApp({
    data(){
        return {
            opcion:0

        };    
    },
    //metodos propios
    methods:{
        
    }
});

//COMPONENTE CON FORMULARIO DE REGISTRO DE USUARIO
app.component("formulario-guardar",{

    data(){
        return {
            documento:"",
            nombres:"",
            apellidos:"",
            telefono:"",
            correo:"",
            edad:"",
        };
    },

    template:`
    <div>
    <h3>REGISTRO DE USUARIOS</h3>
        <form v-on:submit.prevent="guardarUsuario">
            <table>
                <tr>
                    <td>Documento</td>
                    <td><input type="text" v-model="documento"></td>
                </tr>
                <tr>
                    <td>Nombres</td>
                    <td><input type="text" v-model="nombres"></td>
                </tr>
                <tr>
                    <td>Apellidos</td>
                    <td><input type="text" v-model="apellidos"></td>
                </tr>
                <tr>
                    <td>Telefono</td>
                    <td><input type="text" v-model="telefono"></td>
                </tr>
                <tr>
                    <td>Correo</td>
                    <td><input type="email" v-model="correo"></td>
                </tr>
                <tr>
                    <td>Edad</td>
                    <td><input type="number" v-model="edad"></td>
                </tr>
            </table>
            <input type="submit" class="btn btn-warning" value="Guardar Usuario">
        </form>
    </div>
    `,

    methods:{
        guardarUsuario(){
            //console.log(this.documento);
            const endpoint="http://localhost:8080/usuario/guardar";
            const opciones={
                method:"POST",
                headers:{'Content-Type':"application/json"},
                body:JSON.stringify({
                    documento:this.documento,
                    nombres:this.nombres,
                    apellidos:this.apellidos,
                    telefono:this.telefono,
                    correo:this.correo,
                    edad:this.edad
                })
            };

            fetch(endpoint,opciones).then(async response=>{
                
                alertify.alert("Usuario guardado", function(){
                    alertify.success('Guardado');
                });
                
            })
        },

    }
    
});

app.component("borrar-usuario",{
    data(){
        return {
            idEliminar:"",
        };
    },

    template:`
    <div>
        <h3>BORRAR USUARIO</h3>
        <label>Documento</label>
        <input type="text" v-model="idEliminar">
        <input type="button" class="btn btn-danger" v-on:click="borrarUsuario" value="ELIMINAR">
    </div>`,

    methods:{
        borrarUsuario(){
            const endpoint="http://localhost:8080/usuario/borrar/"+this.idEliminar;
            const opciones={method:"DELETE"};
            fetch(endpoint,opciones).then(async response=>{
                var respuesta=await response.json();
                if(respuesta){
                    alertify.success('Usuario Borrado');
                }else{
                    alertify.error('No se Encontro el Usuario!');
                }
                
            })

            
        },
    }

})

app.component("consultar-usuario",{
    data(){
        return {
            busquedaDoc:"",
            usuario:{},            
        };
    },

    template:`
    <div>
        <h3>
            CONSULTAR USUARIO
        </h3>
        <label>Nro Documento</label>
        <input type="text" v-model="busquedaDoc">
        <input class="btn btn-info" type="button" value="BUSCAR" v-on:click="buscarDocumento"><br>
        <label>Documento: {{usuario.documento}}</label><br>
        <label>Nombres: {{ usuario.nombres}}</label><br>
        <label>Apellidos: {{usuario.apellidos}}</label><br>
        <label>Telefono: {{usuario.telefono}}</label><br>
        <label>Correo: {{usuario.correo}}</label><br>
        <label>Edad: {{usuario.edad}}</label><br>
    </div>
    `,

    methods:{
        buscarDocumento(){
            const endpoint="http://localhost:8080/usuario/consultaDocumento/"+this.busquedaDoc;
            const opciones={method:"GET"}
            fetch(endpoint,opciones).then(async response=>{
                this.usuario=await response.json();
            })
        },

    }
});

app.component("buscar-usuario",{
    data(){
        return {
            usuarios:[],
            buscaCorreo:""
        };
    },
    template:`
    <div>
    <label>Correo</label><input type="email" v-model="buscaCorreo">
    <input type="button" value="BUSCAR" class="btn btn-primary" v-on:click="buscarCorreo"><br>

    <input class="btn btn-primary" type="button" value="VER REGISTROS" v-on:click="consultarUsuarios">
    <table class="table table-striped">
        <thead>
            <th>Documento</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Edad</th>
        </thead>
        <tbody>
            <tr v-for="usuario in usuarios">
                <td>{{ usuario.documento }}</td>
                <td>{{ usuario.nombres }}</td>
                <td>{{ usuario.apellidos }}</td>
                <td>{{ usuario.telefono }}</td>
                <td>{{ usuario.correo }}</td>
                <td>{{ usuario.edad }}</td>
            </tr>
        </tbody>

    </table>   
    </div>
    `,

    methods:{
        consultarUsuarios(){
            const endpoint="http://localhost:8080/usuario/consultar";
            const opciones={method:"GET"};
            fetch(endpoint,opciones).then(async response=>{
                this.usuarios=await response.json();
            })

        },
        
        
        buscarCorreo(){
            const endpoint="http://localhost:8080/usuario/buscaxcorreo/"+this.buscaCorreo;
            const opciones={method:"GET"};

            fetch(endpoint,opciones).then(async response=>{
                this.usuarios=await response.json();
            })
        }

    }

})

app.mount("#aplicacion");