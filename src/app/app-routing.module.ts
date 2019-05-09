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
  { path: 'listado-administraciones/:action', loadChildren: './listado-administraciones/listado-administraciones.module#ListadoAdministracionesPageModule' },
  { path: 'listado-examenes/:action', loadChildren: './listado-examenes/listado-examenes.module#ListadoExamenesPageModule' },
  { path: 'listado-especialidades/:action', loadChildren: './listado-especialidades/listado-especialidades.module#ListadoEspecialidadesPageModule' },
  { path: 'listado-opes/:action', loadChildren: './listado-opes/listado-opes.module#ListadoOpesPageModule' },
  { path: 'listado-plantillas-usuario', loadChildren: './listado-plantillas-usuario/listado-plantillas-usuario.module#ListadoPlantillasUsuarioPageModule' },
  { path: 'listado-tipos-acceso/:action', loadChildren: './listado-tipos-acceso/listado-tipos-acceso.module#ListadoTiposAccesoPageModule' },
  { path: 'nueva-plantilla-usuario', loadChildren: './nueva-plantilla-usuario/nueva-plantilla-usuario.module#NuevaPlantillaUsuarioPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
