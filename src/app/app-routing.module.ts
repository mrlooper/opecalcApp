import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'calculadora-SAS1617ESTB', loadChildren: './calculadora-sas1617-estb/calculadora-sas1617-estb.module#CalculadoraSAS1617ESTBPageModule' },
  { path: 'detalle-examen', loadChildren: './detalle-examen/detalle-examen.module#DetalleExamenPageModule' },
  { path: 'editar-plantilla-usuario/:id', loadChildren: './editar-plantilla-usuario/editar-plantilla-usuario.module#EditarPlantillaUsuarioPageModule' },
  { path: 'listado-administraciones/:action', loadChildren: './listado-administraciones/listado-administraciones.module#ListadoAdministracionesPageModule' },
  { path: 'listado-calculadoras', loadChildren: './listado-calculadoras/listado-calculadoras.module#ListadoCalculadorasPageModule' },
  { path: 'listado-examenes/:action', loadChildren: './listado-examenes/listado-examenes.module#ListadoExamenesPageModule' },
  { path: 'listado-especialidades/:action', loadChildren: './listado-especialidades/listado-especialidades.module#ListadoEspecialidadesPageModule' },
  { path: 'listado-opes/:action', loadChildren: './listado-opes/listado-opes.module#ListadoOpesPageModule' },
  { path: 'listado-plantillas-usuario', loadChildren: './listado-plantillas-usuario/listado-plantillas-usuario.module#ListadoPlantillasUsuarioPageModule' },
  { path: 'listado-tipos-acceso/:action', loadChildren: './listado-tipos-acceso/listado-tipos-acceso.module#ListadoTiposAccesoPageModule' },
  { path: 'nueva-plantilla-usuario', loadChildren: './nueva-plantilla-usuario/nueva-plantilla-usuario.module#NuevaPlantillaUsuarioPageModule' },
  { path: 'ver-plantilla/:id', loadChildren: './ver-plantilla/ver-plantilla.module#VerPlantillaPageModule' },
  { path: 'ver-plantilla-usuario/:id', loadChildren: './ver-plantilla-usuario/ver-plantilla-usuario.module#VerPlantillaUsuarioPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
