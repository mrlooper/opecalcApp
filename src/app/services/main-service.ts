import { EventEmitter, Injectable, Output } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { BPEvent } from '../classes/bpevent';
import { ArbolCategorias } from '../classes/arbol-categorias';
import { CarritoCompra } from '../classes/carrito-compra';
import { Pedido, LineaPedido } from '../classes/pedido';
import { PerfilCliente } from '../classes/perfil-cliente';
import { AppSettings } from './app-settings';
import { Producto } from '../classes/producto';
import { Mensaje } from '../classes/mensaje';
import { LineaPedidoPeriodico } from '../classes/pedido-periodico';
import { EnvioPaqueteria } from '../classes/envio-paqueteria';
import { TipoEnvioPaquetria } from '../classes/tipo-envio-paqueteria';
import { MetodoPago } from '../classes/metodo-pago';
import { DialogService } from './dialog-service';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';
import { IEstadoState } from '../store/state/estado.state';
import { SetEstado, SetPerfilCliente, SetPerfilClienteSuccess } from '../store/actions/estado.actions';


/*
  Generated class for the BuzonpackService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({ providedIn: 'root' })
export class MainService {
    public did: string; /* Device ID */
    public cid: string; /* Client ID */
    public datos_usuario = null;
    public id_zona = null;
    public taquilla = null;
    public taquillas = [];
    public categorias: ArbolCategorias;
    public carrito: CarritoCompra;
    public pedido: Pedido;
    public perfil_cliente: PerfilCliente;
    public cabeceras_mensajes_recibidos: Array<Mensaje>;
    public envio_paqueteria: EnvioPaqueteria;
    public tipo_envio_paqueteria: TipoEnvioPaquetria;
    public argsQueue: Array<any>;

    private _avisar_producto_periodico: boolean;
    private loading;

    @Output() eventos: EventEmitter<BPEvent> = new EventEmitter();

    constructor(private uniqueDeviceID: UniqueDeviceID,
        private storage: Storage,
        private http: HttpClient,
        public loadingCtrl: LoadingController,
        public dlgService: DialogService,
        private _store: Store<IAppState>
    ) {

        console.log('Inicializando servicio BuzonPack');
        this.argsQueue = [];

        /* Carrito de la compra */
        this.carrito = new CarritoCompra();

        /* Cargamos datos almacenados */
        this.cargar_datos();

        // this.cargar_categorias();

        this.uniqueDeviceID.get()
            .then((uuid: any) => console.log(uuid))
            .catch((error: any) => {
                console.log(error);
                // this.generar_DID();
            });
    }

    get avisar_producto_periodico(): boolean {
        return this._avisar_producto_periodico;
    }

    set avisar_producto_periodico(val) {
        this._avisar_producto_periodico = val;
        this.storage.set('avisar-producto-periodico', val);
    }

    nuevoEvento(evento) {
        this.eventos.emit(evento);
    }

    generar_DID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        this.did = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

        console.log('Generando DID: ' + this.did);

        this.storage.set('did', this.did);
    }

    set_cid(cid) {
        this.cid = cid;
        this.storage.set('cid', cid);
        this.cargar_perfil_cliente();
        console.log('Seteando CID=' + cid);
    }

    setTaquilla(matricula) {
        this.taquilla = matricula;
        this.storage.set('matricula-taquilla', matricula);
        this.nuevoEvento(new BPEvent('TAQUILLA_SELECCIONADA', { matricula: matricula }));
    }

    setZona(id_zona) {
        this.id_zona = id_zona;
        this.storage.set('id-zona', id_zona);
        this.nuevoEvento(new BPEvent('ZONA_SELECCIONADA', { id: id_zona }));
    }

    setTaquillas(taquillas) {
        this.taquillas = taquillas;
        this.nuevoEvento(new BPEvent('TAQUILLAS_CARGADAS'));
    }

    cargar_datos() {
        console.log('Cargando datos desde almacenamiento');

        let p_did = this.storage.get('did');
        let p_cid = this.storage.get('cid');
        let p_matricula_taquilla = this.storage.get('matricula-taquilla');
        let p_id_zona = this.storage.get('id-zona');
        let p_avisar_producto_periodico = this.storage.get('avisar-producto-periodico');

        let did, cid, matricula_taquilla, id_zona, avisar_producto_periodico;

        Promise.all([
            p_did,
            p_cid,
            p_matricula_taquilla,
            p_id_zona,
            p_avisar_producto_periodico
        ]).then((vals) => {
            [did, cid, matricula_taquilla, id_zona, avisar_producto_periodico] = vals;

            avisar_producto_periodico = avisar_producto_periodico == null ? true : avisar_producto_periodico;

            /* Generamos DID si no lo tenemos */
            if (!did) {
                this.generar_DID();
            }

            /* Referencias locales */
            this.cid = cid;
            this.did = did;
            this.taquilla = matricula_taquilla;
            this.id_zona = id_zona;
            this._avisar_producto_periodico = avisar_producto_periodico;

            /*this._store.select(st => st.estado.loaded)
                .subscribe((val) => {
                    console.log('[BPS] Estado cargado: ' + (val ? 'SI' : 'NO'));

                    if (!val) {
                        console.log('[BPS] Inicializando estado...');
                        let estado: IEstadoState = {
                            did: did,
                            cid: cid,
                            id_zona: id_zona,
                            taquilla: matricula_taquilla,
                            loaded: true,
                            perfil_cliente: null,
                            perfil_cliente_success: false
                        };

                        this._store.dispatch(new SetEstado(estado));

                        console.log('[BPS] Perfil cliente no disponible. Cargando...');
                        this.cargar_perfil_cliente((pc: PerfilCliente) => {
                            this._store.dispatch(new SetPerfilCliente(pc));
                            this._store.dispatch(new SetPerfilClienteSuccess());
                        });
                    }
                });*/

        });

        return;
    }

    cargarCabecerasMensajesRecibidos(cb = null) {
        const self = this;

        this.api_cabeceras_mensajes_recibidos(function (data) {
            if (data.codigo == 0) {
                let cms: Array<Mensaje> = [];
                let m: Mensaje;
                let i: number;

                for (i = 0; i < data.mensajes.length; i++) {
                    m = new Mensaje();
                    m.cargarJson(data.mensajes[i]);
                    cms.push(m);
                }

                self.cabeceras_mensajes_recibidos = cms;
            }

            cb && cb(data);
        });
    }

    cargarLineasPedidosPeriodicos(cb = null) {

        function cmp(a: LineaPedidoPeriodico, b: LineaPedidoPeriodico) {
            if (a.producto.nombre.toLocaleLowerCase() > b.producto.nombre.toLocaleLowerCase()) {
                return 1;
            }
            if (a.producto.nombre.toLocaleLowerCase() < b.producto.nombre.toLocaleLowerCase()) {
                return -1;
            }

            return 0;
        }

        this.api_lineas_pedidos_periodicos(function (data) {
            let lineas: Array<LineaPedidoPeriodico> = [];
            let l: LineaPedidoPeriodico;

            if (data.codigo == 0) {
                let i;

                for (i = 0; i < data.lineas.length; i++) {
                    l = new LineaPedidoPeriodico();
                    l.cargarJson(data.lineas[i]);
                    lineas.push(l);
                }

                lineas.sort(cmp);

                cb && cb(lineas);
            }

        });
    }

    cargarLineaPedidoPeriodico(id_linea, cb = null) {
        this.api_datos_linea_pedido_periodico(id_linea, function (data) {
            let l: LineaPedidoPeriodico;

            if (data.codigo == 0) {
                l = new LineaPedidoPeriodico();
                l.cargarJson(data.linea);
                cb && cb(l);
            }

        });
    }

    cargarPedido(codigo_pedido, cb = null) {

        this.api_pedido(codigo_pedido, function (data) {
            let p: Pedido;

            if (data.codigo == 0) {
                p = new Pedido()
                p.cargarJson(data.pedido);

                cb && cb(p);
            }

        });
    }

    cargarPedidos(cb = null) {

        this.api_pedidos(function (data) {
            let pedidos: Array<Pedido> = [];
            let p: Pedido;

            if (data.codigo == 0) {
                let i;

                for (i = 0; i < data.pedidos.length; i++) {
                    p = new Pedido()
                    p.cargarJson(data.pedidos[i]);
                    pedidos.push(p);
                }

                cb && cb(pedidos);
            }

        });
    }

    cargar_categorias(cb = null) {
        var self = this;
        this.api_categorias(function (data) {
            if (data.codigo == 0) {
                self.categorias = new ArbolCategorias();
                self.categorias.cargarDatos(data.categorias);
                cb && cb(data);
            }

        });
    }

    cargar_envios_paqueteria(cb = null) {

        this.api_envios_paqueteria(function (data) {
            if (data.codigo == 0) {
                let envios: Array<EnvioPaqueteria> = [];
                let envio: EnvioPaqueteria;
                let i;

                for (i = 0; i < data.envios_paqueteria.length; i++) {
                    envio = new EnvioPaqueteria();
                    envio.cargarJson(data.envios_paqueteria[i]);
                    envios.push(envio);
                }

                cb && cb(envios);
            }

        });
    }

    cargar_metodos_pago_pedido(codigo_pedido, cb = null) {

        this.api_metodos_pago_pedido(codigo_pedido, function (data) {
            if (data.codigo == 0) {
                let metodos_pago: Array<MetodoPago> = [];
                let mp: MetodoPago;
                let i;

                for (i = 0; i < data.metodos_pago.length; i++) {
                    let dmp = data.metodos_pago[i];
                    mp = new MetodoPago();
                    mp.cargarJson(dmp);
                    metodos_pago.push(mp);
                }

                cb && cb(metodos_pago);
            }
        });

    }

    cargar_perfil_cliente(cb = null) {
        this.api_perfil_cliente((data) => {
            if (data.codigo == 0) {

                /* Perfil */
                let pc = new PerfilCliente();
                pc.cargarJson(data.perfil);
                this.perfil_cliente = pc;

                /* Pedido pendiente (puede que haya o no) */
                this.pedido = pc.pedido;

                console.log('Perfil cliente cargado');
                cb && cb(pc);
            } else {
                console.error('No se pudo cargar el perfil del cliente');
            }
        });
    }

    activarLineaPedidoPeriodico(l: LineaPedidoPeriodico, cb = null) {
        this.api_activar_linea_pedido_periodico(l.id, cb);
    }

    desactivarLineaPedidoPeriodico(l: LineaPedidoPeriodico, cb = null) {
        this.api_desactivar_linea_pedido_periodico(l.id, cb);
    }

    activarDiaLineaPedidoPeriodico(l: LineaPedidoPeriodico, dia, cb = null) {
        this.api_activar_dia_linea_pedido_periodico(l.id, dia, cb);
    }

    desactivarDiaLineaPedidoPeriodico(l: LineaPedidoPeriodico, dia, cb = null) {
        this.api_desactivar_dia_linea_pedido_periodico(l.id, dia, cb);
    }

    usuario_registrado() {
        return this.cid != null;
    }

    cargar_taquillas(cb = null) {
        this.taquillas = [];

        this.api_taquillas_cliente((data) => {
            if (data.count > 0) {
                this.taquillas = data.taquillas;
            }

            cb && cb(data);
        });
    }

    anularPedido() {
        if (this.pedido) {
            this.api_anular_pedido(this.pedido.codigo, null, false);
            this.pedido = null;
        }
    }

    eliminarMensaje(m: Mensaje, cb = null) {
        var self = this;

        this.api_eliminar_mensaje(m.id, function (data) {

            if (data.codigo == 0) {
                self.nuevoEvento(new BPEvent('MENSAJE_ELIMINADO'));
            }

            cb && cb(data);
        });

    }

    nuevaLineaPedido(lp: LineaPedido, cb = null) {
        var self = this;

        this.api_nueva_linea_pedido(lp, function (data) {
            var datos = {
                codigo: data.codigo,
                pedido: null
            };

            if (data.codigo == 0) {
                self.pedido = new Pedido();
                self.pedido.cargarJson(data.pedido);

                datos.pedido = self.pedido;
            }

            cb && cb(datos);
        });

    }

    nuevaLineaPedidoPeriodico(codigo_producto, unidades, cb = null) {

        this.api_nueva_linea_pedido_periodico(codigo_producto, unidades, function (data) {
            cb && cb(data);
        });

    }

    aniadirProductoCesta(p: Producto, unidades = 1, cb = null) {
        let self = this;
        let lp: LineaPedido;

        function procesar_respuesta(data) {
            if (data.codigo == 0) {
                self.pedido = new Pedido();
                self.pedido.cargarJson(data.pedido);
            }

            cb && cb(data);
        }

        if (this.pedido) {
            lp = this.pedido.existeProducto(p);
        }

        if (lp && lp.producto.permite_incremento_unidades) {
            self.api_incrementar_unidades_linea_pedido(this.pedido.codigo, lp.id, procesar_respuesta);
        } else {
            lp = new LineaPedido()
            lp.codigo_producto = p.codigo;
            lp.unidades = unidades;
            self.api_nueva_linea_pedido(lp, procesar_respuesta);
        }
    }

    aniadirProductoPeriodico(p: Producto, unidades, dias, cb = null) {
        let self = this;

        self.api_nueva_linea_pedido_periodico(p.codigo, unidades, dias, cb);
    }



    private http_post_api(method, params, cb, mostrar_dialogo = true) {
        const url = AppSettings.API_URL + method;

        /* Dialogo espera */
        mostrar_dialogo && this.dlgService.presentLoading('Realizando operación...');

        this.http
            .post(url, params)
            .subscribe(data => { this.dlgService.dimissLoading(); cb(data); },
                error => {
                    this.dlgService.dimissLoading();
                    this.dlgService.presentToast('Se produjo un error inesperado');
                });
    }

    api_activar_dia_linea_pedido_periodico(id_linea, dia, cb = null, mostrar_dialogo = true) {
        this.http_post_api('activar-dia-linea-pedido-periodico', {
            'cid': this.cid,
            'id-linea': id_linea,
            'dia': dia
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo);
    }

    api_activar_linea_pedido_periodico(id_linea, cb = null, mostrar_dialogo = true) {
        this.http_post_api('activar-linea-pedido-periodico', {
            'cid': this.cid,
            'id-linea': id_linea
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_actualizar_pedido(p: Pedido, cb = null) {
        var i;
        var lp: LineaPedido;
        var datos = {
            'cid': this.cid,
            'matricula-taquilla': p.matricula_taquilla,
            'codigo': p.codigo,
            'lineas': []
        };

        for (i = 0; i < p.lineas.length; i++) {
            lp = p.lineas[i];
            datos.lineas.push({
                codigo: lp.codigo_producto,
                unidades: lp.unidades
            });
        }

        this.http_post_api('actualizar-pedido', datos, function (data) {   // data is already a JSON object
            var datos = {
                codigo: data.codigo,
                pedido: null
            };

            if (data.codigo == 0) {
                var p = new Pedido();
                p.cargarJson(data.pedido);

                datos.pedido = p;
            }

            cb && cb(datos);
        });
    }

    api_anular_pedido(codigo, cb = null, mostrar_dialogo = true) {
        this.http_post_api('anular-pedido', {
            cid: this.cid,
            codigo: codigo
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_cabeceras_mensajes_recibidos(cb = null, mostrar_dialogo = true) {
        this.http_post_api('cabeceras-mensajes-recibidos', {
            cid: this.cid
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_categorias(cb) {
        let args = {};

        if (this.id_zona) {
            args['id-zona'] = this.id_zona;
        }

        this.http_post_api('categorias', args, function (data) {   // data is already a JSON object
            cb(data);
        })
    }

    api_comprobar_codigo_validacion(numero, codigo, cb) {
        this.http_post_api('comprobar-codigo-validacion', {
            tid: 'abc',
            numero: numero,
            codigo: codigo
        }, function (data) {   // data is already a JSON object
            cb(data);
        })
    }

    api_datos_cliente(cb = null, mostrar_dialogo = true) {
        this.http_post_api('datos-cliente', {
            'cid': this.cid
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_datos_linea_pedido_periodico(id_linea, cb = null, mostrar_dialogo = true) {
        this.http_post_api('datos-linea-pedido-periodico', {
            'cid': this.cid,
            'id-linea': id_linea
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_decrementar_unidades_linea_pedido(codigo_pedido, id_linea, cb = null, mostrar_dialogo = true) {
        this.http_post_api('decrementar-unidades-linea-pedido', {
            'cid': this.cid,
            'codigo-pedido': codigo_pedido,
            'id-linea': id_linea
        }, function (data) {   // data is already a JSON object
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_depositar_envio_paqueteria(id_envio, cb = null, mostrar_dialogo = true) {
        this.http_post_api('depositar-envio-paqueteria', {
            'cid': this.cid,
            'id-envio-paqueteria': id_envio
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_desactivar_dia_linea_pedido_periodico(id_linea, dia, cb = null, mostrar_dialogo = true) {
        this.http_post_api('desactivar-dia-linea-pedido-periodico', {
            'cid': this.cid,
            'id-linea': id_linea,
            'dia': dia
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_desactivar_linea_pedido_periodico(id_linea, cb = null, mostrar_dialogo = true) {
        this.http_post_api('desactivar-linea-pedido-periodico', {
            'cid': this.cid,
            'id-linea': id_linea
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_detalle_mensaje(id_mensaje, cb = null, mostrar_dialogo = true) {
        this.http_post_api('detalle-mensaje', {
            'cid': this.cid,
            'id-mensaje': id_mensaje
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_eliminar_linea_pedido(codigo_pedido, id_linea, cb = null, mostrar_dialogo = true) {
        this.http_post_api('eliminar-linea-pedido', {
            'cid': this.cid,
            'codigo-pedido': codigo_pedido,
            'id-linea': id_linea
        }, function (data) {   // data is already a JSON object
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_eliminar_mensaje(id_mensaje, cb = null, mostrar_dialogo = true) {
        this.http_post_api('eliminar-mensaje', {
            cid: this.cid,
            id: id_mensaje
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_eliminar_registro_taquilla(matricula, cb) {
        this.http_post_api('eliminar-registro-taquilla', {
            cid: this.cid,
            matricula: matricula
        }, function (data) {   // data is already a JSON object
            cb(data);
        })
    }

    api_envio_paqueteria(id_envio, cb = null, mostrar_dialogo = true) {
        this.http_post_api('envio-paqueteria', {
            'cid': this.cid,
            'id-envio-paqueteria': id_envio
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_envios_paqueteria(cb = null, mostrar_dialogo = true) {
        this.http_post_api('envios-paqueteria', {
            'cid': this.cid
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_incrementar_unidades_linea_pedido(codigo_pedido, id_linea, cb = null, mostrar_dialogo = true) {
        this.http_post_api('incrementar-unidades-linea-pedido', {
            'cid': this.cid,
            'codigo-pedido': codigo_pedido,
            'id-linea': id_linea
        }, function (data) {   // data is already a JSON object
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_lineas_pedidos_periodicos(cb = null, mostrar_dialogo = true) {
        this.http_post_api('lineas-pedidos-periodicos', {
            cid: this.cid
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_metodos_pago_pedido(codigo_pedido, cb = null) {
        var datos = {
            'cid': this.cid,
            'codigo-pedido': codigo_pedido,
        }

        this.http_post_api('metodos-pago-pedido', datos, function (data) {   // data is already a JSON object
            cb && cb(data);
        });
    }

    api_nueva_linea_pedido(lp: LineaPedido, cb = null) {
        var datos = {
            'cid': this.cid,
            'matricula-taquilla': this.taquilla,
            'codigo-pedido': this.pedido ? this.pedido.codigo : '',
            'codigo-producto': lp.codigo_producto,
            'unidades': lp.unidades
        }

        this.http_post_api('nueva-linea-pedido', datos, function (data) {   // data is already a JSON object
            cb && cb(data);
        });
    }

    api_nueva_linea_pedido_periodico(codigo_producto, unidades, dias, cb = null) {
        var datos = {
            'cid': this.cid,
            'matricula-taquilla': this.taquilla,
            'codigo-producto': codigo_producto,
            'unidades': unidades,
            'reparto-lunes': dias.l,
            'reparto-martes': dias.m,
            'reparto-miercoles': dias.x,
            'reparto-jueves': dias.j,
            'reparto-viernes': dias.v,
            'reparto-sabado': dias.s,
            'reparto-domingo': dias.d
        }

        this.http_post_api('nueva-linea-pedido-periodico', datos, function (data) {
            cb && cb(data);
        });
    }

    api_nuevo_envio_paqueteria(ep: EnvioPaqueteria, t: TipoEnvioPaquetria, cb) {
        this.http_post_api('nuevo-envio-paqueteria', {
            'cid': this.cid,
            'matricula-taquilla': this.taquilla,
            'r-nombre': ep.r_nombre,
            'r-apellidos': ep.r_apellidos,
            'r-empresa': ep.r_empresa,
            'r-direccion-1': ep.r_direccion_1,
            'r-direccion-2': ep.r_direccion_2,
            'r-cp': ep.r_cp,
            'r-telefono': ep.r_telefono,
            'd-nombre': ep.d_nombre,
            'd-apellidos': ep.d_apellidos,
            'd-empresa': ep.d_empresa,
            'd-direccion-1': ep.d_direccion_1,
            'd-direccion-2': ep.d_direccion_2,
            'd-cp': ep.d_cp,
            'd-telefono': ep.d_telefono,
            'ancho': ep.ancho,
            'alto': ep.alto,
            'largo': ep.largo,
            'peso': ep.peso,
            'codigo-tipo-envio-paqueteria': t.codigo
        }, function (data) {   // data is already a JSON object
            cb && cb(data);
        })
    }

    api_ofertas(cb = null) {
        let args = {
            'id-zona': this.id_zona,
            'en-oferta': true,
            'num-filas': 999
        };

        this.http_post_api('productos', args, function (data) {   // data is already a JSON object
            cb && cb(data);
        })
    }

    api_pedido(codigo_pedido, cb = null, mostrar_dialogo = true) {
        this.http_post_api('pedido', {
            'cid': this.cid,
            'codigo': codigo_pedido
        }, function (data) {   // data is already a JSON object
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_pedidos(cb = null, mostrar_dialogo = true) {
        this.http_post_api('pedidos', {
            cid: this.cid
        }, function (data) {   // data is already a JSON object
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_perfil_cliente(cb = null, mostrar_dialogo = true) {
        this.http_post_api('perfil-cliente', {
            cid: this.cid
        }, function (data) {   // data is already a JSON object
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_producto(referencia, cb = null) {
        let args = { referencia: referencia };

        this.http_post_api('producto', args, function (data) {   // data is already a JSON object
            cb && cb(data);
        })
    }

    api_productos(filtro = null, cb = null) {
        let args = filtro ? filtro : {};

        if (this.id_zona) {
            args['id-zona'] = this.id_zona;
        }

        this.http_post_api('productos', args, function (data) {   // data is already a JSON object
            cb && cb(data);
        })
    }

    api_registrar_taquilla(matricula, cb) {
        this.http_post_api('registrar-taquilla', {
            cid: this.cid,
            matricula: matricula
        }, function (data) {   // data is already a JSON object
            cb(data);
        })
    }

    api_verificar_numero(numero, cb) {
        this.http_post_api('enviar-codigo-validacion', {
            tid: 'abc',
            numero: numero
        }, function (data) {   // data is already a JSON object
            cb(data);
        })
    }

    api_taquillas_cliente(cb) {
        this.http_post_api('taquillas-cliente', {
            cid: this.cid
        }, function (data) {   // data is already a JSON object
            cb(data);
        });
    }

    api_tipos_envio_paquetria(cb = null, mostrar_dialogo = true) {
        this.http_post_api('tipos-envio-paqueteria', {
            'cid': this.cid,
            'matricula-taquilla': this.taquilla
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_ultimo_envio_paqueteria(cb = null, mostrar_dialogo = true) {
        this.http_post_api('ultimo-envio-paqueteria', {
            'cid': this.cid,
        }, function (data) {
            cb && cb(data);
        }, mostrar_dialogo)
    }

    api_validar_remitente_envio_paqueteria(ep: EnvioPaqueteria, cb) {
        this.http_post_api('validar-remitente-envio-paqueteria', {
            'cid': this.cid,
            'r-nombre': ep.r_nombre,
            'r-apellidos': ep.r_apellidos,
            'r-empresa': ep.r_empresa,
            'r-direccion-1': ep.r_direccion_1,
            'r-direccion-2': ep.r_direccion_2,
            'r-cp': ep.r_cp,
            'r-telefono': ep.r_telefono
        }, function (data) {   // data is already a JSON object
            cb && cb(data);
        })
    }

    api_validar_destinatario_envio_paqueteria(ep: EnvioPaqueteria, cb) {
        this.http_post_api('validar-destinatario-envio-paqueteria', {
            'cid': this.cid,
            'd-nombre': ep.d_nombre,
            'd-apellidos': ep.d_apellidos,
            'd-empresa': ep.d_empresa,
            'd-direccion-1': ep.d_direccion_1,
            'd-direccion-2': ep.d_direccion_2,
            'd-cp': ep.d_cp,
            'd-telefono': ep.d_telefono
        }, function (data) {   // data is already a JSON object
            cb && cb(data);
        })
    }


}
