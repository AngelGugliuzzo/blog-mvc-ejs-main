import { Request, Response } from 'express';
import logger from '../helpers/logger';
import { Inoticias_create } from '../interfaces/noticias/noticias.interfaces';
import { IsNull } from 'typeorm';
import { dbcontext } from '../db/dbcontext';   //estos ultimos import se crean para crear la noticia
import { Noticia } from '../models/noticias.entity';



export const noticiasIndex = (req: Request, res: Response) => {
	// Aca devolver todas las noticias ordenadas por fecha
	// ver documentacion de typeorm
	const nombre = 'Pedro';
	res.render('home/index', { nombre });
};



export const crearNoticiaView = (req: Request, res: Response) => {
	res.render('noticias/crear');
};


export const crearNoticia = async (req: Request, res: Response) => {

	//const data: Inoticias_create = req.body;

	//if (data.titulo_noticia.trim()=== '' || data.desc_noticia.trim()==='') { 
	//	res.render('shared/error');
//	}


	//todo: aca guardo en la base de datos
	

	
 try {
	const noticiaRepository = await dbcontext.getRepository(Noticia)
	
	const nuevaNoticia: Inoticias_create = req.body;
	console.log(nuevaNoticia)


	// creamos la noticia sin guardar
	const noticia = await noticiaRepository.create({
		...nuevaNoticia
	});
	console.log(noticia)

	// guardamos la noticia
	const result = await noticiaRepository.save(noticia);
	console.log(result)

	res.json({
		msg: `Se creo la noticia correctamente con el id:`,
		
	});

	//logger.debug(
	//	`El usuario con nombre : ${req.usuario.nombre} ${
	//		req.usuario.apellido
	//	} creo la noticia ${JSON.stringify(nuevaNoticia)}`
	//);

} catch (error) {
	logger.error(`no se pudo crear la noticia`);
	res.status(500).json({ msg: 'No se pudo guardar la noticia' }); //el res no anda
	//res.redirect('/noticias')                                     //el res no anda 
}
};


	//console.log(nuevaNoticia);

	//res.redirect('/noticias');
//};
