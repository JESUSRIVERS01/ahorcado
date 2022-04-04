var divPadre=document.getElementById("botones");
var divHijo=document.getElementById("botonEinput");
var divNieto=document.getElementById("botonAgregar");
var divNietoDos=document.getElementById("inputTexto");
var crearBoton=document.createElement("button");
var botonjugar=document.getElementById("botonjugar");
botonjugar.textContent="jugar";
var agregarPalabra=document.getElementById("agregarPalabra");
var palabraNueva=document.getElementById("estiloInput");
var palabrasDelJuego=["hola","adios","omar","ricardo","caleb","pera","elefante","tornillo","qwerty","zorro"];
var contador=document.getElementById("vidasNumero");
var erroresLetra=document.getElementById("erroresLetra");
var titulo=document.getElementById("titulo");
var canvas=document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var regex=/[a-zñ]/;
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
		ctx.beginPath();
		ctx.moveTo(250, 230); 
		ctx.lineTo(150, 260);
		ctx.lineTo(350, 260);
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(250, 230);
		ctx.lineTo(250,50);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(250, 50);
		ctx.lineTo(400,50);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(400, 50);
		ctx.lineTo(400,70);
		ctx.stroke();
	}
	var cabeza = () => {
		ctx.beginPath();
		ctx.arc(400, 95, 25, 0, Math.PI * 2, true); // Outer circle
		ctx.moveTo(410, 110);
		ctx.arc(400, 110, 10, 0, Math.PI, true);  // Mouth (clockwise)
		ctx.moveTo(395, 85);
		ctx.arc(395, 85, 2, 0, Math.PI * 2, true);  // Left eye
		ctx.moveTo(405, 85);
		ctx.arc(405, 85, 2, 0, Math.PI * 2, true);  // Right eye
		ctx.stroke();
	}
	var torso = ()=> {
		ctx.beginPath();
		ctx.moveTo(400, 120);
		ctx.lineTo(400,200);
		ctx.stroke();
	}
	var brazoIzquierdo = ()=> {
		ctx.beginPath();
		ctx.moveTo(400, 130);
		ctx.lineTo(450,120);
		ctx.stroke();
	}
	var brazoDerecho=()=> {
		ctx.beginPath();
		ctx.moveTo(400, 130);
		ctx.lineTo(350,120);
		ctx.stroke();
	}
	var piernaIzquierda=()=> {
		ctx.beginPath();
		ctx.moveTo(400, 200);
		ctx.lineTo(450,240);
		ctx.stroke();
	}
	var piernaDerecha=()=> {
		ctx.beginPath();
		ctx.moveTo(400, 200);
		ctx.lineTo(350,240);
		ctx.stroke();
	}
	var cuerpo= [piernaIzquierda,piernaDerecha,brazoIzquierdo,brazoDerecho,torso,cabeza];

	function parteCuerpo (numero) {
		numero();
	}
	var perdiste = (a,b,c,d,e,f)=>{
		window.removeEventListener("keyup",compararEntrada);
		uno=0;
		botonjugar.classList.remove("ejs");
		divNietoDos.classList.remove("ejs");
		botonjugar.textContent="jugar de nuevo";
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
		botonjugar.classList.add("ejs");
		divNietoDos.classList.add("ejs");
		base();
	}
	var compararEntrada=(e)=>{			
		if(regex.test(e.key)){
			var nreguex=new RegExp(e.key);
			if(nreguex.test(texto)){
					
				if (!nreguex.test(cajaTres)) {
					cajaTres=e.key+cajaTres
					textoArray.forEach(function(el,p) { 
						if (el==e.key) {	
							posiciones=puntoPartida+((linea+espacio)*p);
							ctx.beginPath();
							ctx.font="bold 45px arial"; 
							ctx.textAlign="center";
							ctx.textBaseline = "alphabetic";
							ctx.fillText(e.key,posiciones+(linea/2),350); 
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
									perdiste(a,b,c,d,e,f);
								}
							}

						}
					})
				}	
			}
			else{
				if(regNumerico.test(e.keyCode)){
					cajaLetra=new RegExp(e.key);	
					if (!cajaLetra.test(errores)) {
						errores=e.key+errores;
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
								perdiste(a,b,c,d,e,f);
							}	
						}
					}
				}
			}

		}
	};
	var iniciarJuego=()=>{	
		window.addEventListener("keyup",compararEntrada)																		
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
	botonjugar.addEventListener("click",iniciarJuego);



	


	
		
	
	
 