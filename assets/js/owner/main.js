var botonjugar=document.getElementById("botonUno");
var botonDos=document.getElementById("botonDos");
var contenedor=document.getElementById("contenedor")
var titulo=document.getElementById("tituloYMenu");
var palabraNueva=document.querySelector("#estiloInput");
var botEinp=document.getElementById("botones");
var cajaInput=document.getElementById("inputTexto");
var errorL=document.getElementById("errorestexto");
var nVidas=document.getElementById("vidasTexto");
var mensaje=document.getElementById("spann");
var aceptar=document.getElementById("aceptar");
var palabrasDelJuego=["hola","adios","omar","ricardo","caleb","pera","elefante","tornillo","qwerty","zorro","arbol","perro","manzana","platano","aguacate","clavo","sofa","refrigerar","gato"];
var contador=document.getElementById("vidasNumero");
var erroresLetra=document.getElementById("erroresLetra");
var inputMovil=document.getElementById("inputMovile")
var titulo=document.getElementById("titulo");
var canvas=document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var regex=/[a-z]/i;
var regNumerico=/\b[6-8]\d{1}\b|90/;
var regexCuerpo=/[0-6]/;
var texto="";
var textoArray=[];
var linea = 40;        
var espacio = 20;
var areaTotal=0;
var puntoPartida=0;
var errores="";
var suma="";
var numVidas="";
var uno = 1;
var posiciones="";
var letra="";
var cajaLetra="";
var cajaDos="";
var cajaTres="";
   var base = ()=>{
	ctx.fillRect(0,260,600,2);
	ctx.beginPath();
	ctx.moveTo(150, 230); 
	ctx.lineTo(100, 260);
	ctx.lineTo(200, 260);
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(150, 230);
	ctx.lineTo(150,50);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(150, 50);
	ctx.lineTo(300,50);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(450, 230); 
	ctx.lineTo(500, 260);
	ctx.lineTo(400, 260);
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(450, 230);
	ctx.lineTo(450,50);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(300, 50);
	ctx.lineTo(450,50);
	ctx.stroke();
	}
	var cabeza = () => {
		ctx.beginPath();
		ctx.arc(300, 95, 25, 0, Math.PI * 2, true); // Outer circle
		ctx.moveTo(310, 110);
		ctx.arc(300, 110, 10, 0, Math.PI, true);  // Mouth (clockwise)
		ctx.stroke();
		ctx.beginPath();
		ctx.fillStyle="black";
		ctx.moveTo(296, 85);
		ctx.arc(293, 85, 2, 0, Math.PI * 2, true);  // Left eye
		ctx.moveTo(310, 85);
		ctx.arc(307, 85, 2, 0, Math.PI * 2, true);  // Right eye
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(300, 50);
		ctx.lineTo(300,70);
		ctx.stroke();
	}
	var cabezaFeliz=()=>{
		ctx.clearRect(0, 0, 600,262);
		ctx.fillRect(150,240,300,2);
		ctx.beginPath();
		ctx.arc(300, 95, 25, 0, Math.PI * 2, true); // Outer circle
		ctx.moveTo(310, 100);
		ctx.arc(300, 100, 10, 0, Math.PI, false);  // Mouth (clockwise)
		ctx.stroke();
		ctx.beginPath();
		ctx.fillStyle="black";
		ctx.moveTo(296, 85);
		ctx.arc(293, 85, 2, 0, Math.PI * 2, true);  // Left eye
		ctx.moveTo(310, 85);
		ctx.arc(307, 85, 2, 0, Math.PI * 2, true);  // Right eye
		ctx.fill();
		ctx.stroke();
	}
	var cabezatriste=()=>{
		ctx.clearRect(0, 0, 600,262);
		base();
		ctx.beginPath();
		ctx.moveTo(300, 50);
		ctx.lineTo(300,70);
		ctx.stroke();
		ctx.fillRect(0,260,600,2);	
		ctx.beginPath();
		ctx.arc(300, 235, 25, 0, Math.PI * 2, true); // Outer circle
		ctx.moveTo(300, 255);
		ctx.arc(309, 250, 9,.8*Math.PI, 1.8*Math.PI, false);  // Mouth (clockwise)
		ctx.stroke();
		ctx.beginPath();
		ctx.fillStyle="red";
		ctx.moveTo(292, 233);
		ctx.arc(289, 233, 3, 0, Math.PI * 2, true);  // Left eye
		ctx.moveTo(309, 224)
		ctx.arc(306, 224, 3, 0, Math.PI * 2, true);  // Right eye
		ctx.fill();
		ctx.stroke();
	}

	var torso = ()=> {
		ctx.beginPath();
		ctx.moveTo(300, 120);
		ctx.lineTo(300,200);
		ctx.stroke();
	}
	var brazoIzquierdo = ()=> {
		ctx.beginPath();
		ctx.moveTo(300, 130);
		ctx.lineTo(250,120);
		ctx.stroke();
	}
	var brazoDerecho=()=> {
		ctx.beginPath();
		ctx.moveTo(300, 130);
		ctx.lineTo(350,120);
		ctx.stroke();
	}
	var piernaIzquierda=()=> {
		ctx.beginPath();
		ctx.moveTo(300, 200);
		ctx.lineTo(250,240);
		ctx.stroke();
	}
	var piernaDerecha=()=> {
		ctx.beginPath();
		ctx.moveTo(300, 200);
		ctx.lineTo(350,240);
		ctx.stroke();
	}
	var cuerpo= [piernaIzquierda,piernaDerecha,brazoIzquierdo,brazoDerecho,torso,cabeza];

	function parteCuerpo (numero) {
		numero();
	}
	var perdiste = (a,b,c,d,e,f)=>{
		inputMovil.removeEventListener("keyup",compararEntrada);
		uno=0;
		botEinp.classList.remove("ejs");
		ctx.font = '40px calibri';
		ctx.fillStyle = 'Black';
		ctx.textAlign="center";
		ctx.fillText(a, b, c);
		ctx.fillText(d, e, f);
		textoArray.forEach(function(le,lp){
			posiciones=puntoPartida+((linea+espacio)*lp);
			ctx.beginPath();
			ctx.font="bold 45px arial"; 
			ctx.textAlign="center";
			ctx.textBaseline = "alphabetic";
			ctx.fillText(le,(posiciones+(linea/2)),350); 
			ctx.stroke();
		});
	}
	var limpiar = ()=>{	
		uno=1;							
		contador.textContent="";
		errores="";
		cajaDos="";
		cajaTres="";
		erroresLetra.textContent="";
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		botEinp.classList.add("ejs");
		contenedor.classList.add("ejsa");
		contador.classList.add("azul");
		erroresLetra.classList.add("azul");
		base();
	}
	var compararEntrada=(e)=>{		
		if(regex.test(e.key)){
			var minusculas=e.key.toLowerCase()
			var nreguex=new RegExp(minusculas);
			if(nreguex.test(texto)){
				if (!nreguex.test(cajaTres)) {	
					textoArray.forEach(function(el,p) { 
						if (el==minusculas) {	
							posiciones=puntoPartida+((linea+espacio)*p);
							ctx.beginPath();
							ctx.font="bold 45px arial"; 
							ctx.textAlign="center";
							ctx.textBaseline = "alphabetic";
							ctx.fillText(minusculas,posiciones+(linea/2),350); 
							ctx.stroke();
							if(/[1-6]/.test(numVidas)){
								cajaDos=p+cajaDos;
								if(cajaDos.length==texto.length){
									a="¡felicidades!"
									b=300
									c=40
									d="acertaste a la palabra :"
									e=300
									f=300
									cabezaFeliz();
									torso();
									brazoDerecho();
									brazoIzquierdo();
									piernaDerecha();
									piernaIzquierda();
									perdiste(a,b,c,d,e,f);
								}
							}
						}
					})
				}	
			}
			else{
				if(regNumerico.test(e.keyCode)){
					var cambia=e.key.toLowerCase()
					cajaLetra=new RegExp(cambia);
					if (!cajaLetra.test(errores)) {
						errores=cambia+errores;
						erroresLetra.textContent=errores;
						var resta = numVidas-suma;
						numVidas=resta-uno
						contador.textContent=numVidas;	
						if (regexCuerpo.test(numVidas)) {
							var numero=cuerpo[numVidas];
							parteCuerpo(numero);
							if (numVidas==0) {
								a=" ups! perdiste"
								b=300
								c=40
								d="la palabra correcta es: "
								e=300
								f=300
								cabezatriste();
								perdiste(a,b,c,d,e,f);
							}	
						}
					}
				}
			}
							
		}
	};
	function iniciarJuego(){	
		inputMovil.focus();
		cajaInput.classList.add("ejs");
		document.getElementById("vidas").classList.add("naranja");
		document.getElementById("errores").classList.add("naranja");
		inputMovil.addEventListener("keyup",compararEntrada)
		errorL.textContent="Errores"		
		nVidas.textContent="Vidas"																
		limpiar();
		var azar = palabrasDelJuego[Math.floor(Math.random() * palabrasDelJuego.length)];
		texto = azar;
		console.log(texto);
		areaTotal= ((texto.length*linea)+((texto.length-1)*espacio));
		puntoPartida=((600-areaTotal)/2);
		numVidas=6
		contador.textContent=numVidas
		textoArray = texto.split(""); 	
		textoArray.forEach(function(el,p) {
			posiciones=puntoPartida+((linea+espacio)*p);
			ctx.beginPath();
			ctx.moveTo(posiciones,360);
			ctx.lineTo(posiciones+linea,360);
			ctx.stroke();		
		})
	}
	botonDos.addEventListener("click",function(e){
		botonDos.textContent="Agregar"
		cajaInput.classList.remove("ejs");
		palabraNueva.focus();	
		if (palabraNueva.value== "") {
			return
		}																
		if(regex.test(palabraNueva.value)){
			var palabra=palabraNueva.value
			var nrp=new RegExp(palabra)
			if(!/\s|\W|\d|_/.test(palabra)){
				if(!nrp.test(palabrasDelJuego)){
					palabrasDelJuego.push(palabra.toLowerCase());
					console.log(palabrasDelJuego);
					palabraNueva.value="";
					cajaInput.classList.add("ejs");
				}
				else{
					// aceptar.classList.remove("ejs");
					palabraNueva.value="";
				}
			}	
			else{
				palabraNueva.value="";
			}
		}
		else{
			// aceptar.classList.remove("ejs");

		}
		
	});
	botonjugar.addEventListener("click",iniciarJuego);
	cajaInput.classList.add("ejs");
	// mensaje.classList.add("ejs");
	
	var letraUsuario= inputMovil.value;
	console.log(letraUsuario.toLowerCase());