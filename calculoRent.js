
function validaAporte(Aporte) {
    if (Aporte > 0 && Aporte != 0) {
      return true;
    }else {
      return false;
    }
}
function validaAnos(Anos) {
    if (Anos > 0 && Anos < 100 && Anos != 0) {
      return true;
    }else {
      return false;
    }
}
function validaRentabilidade(Rentabilidade, Anos) {
    if (Rentabilidade > 0 && Anos != 0 ) {
      return true;
    }else {
      return false;
    }
}
function montaparagrafo(dado,nomeClass) {
	    var p = document.createElement("p");
	    p.textContent = dado;
	    p.classList.add(nomeClass);

	    return p;
	}
function montah2(dado, nomeClass) {
	    var h2 = document.createElement("h2");
	    h2.textContent = dado;
	    h2.classList.add(nomeClass);

	    return h2;
	}
function montah3(dado, nomeClass) {
	    var h3 = document.createElement("h3");
	    h3.textContent = dado;
	    h3.classList.add(nomeClass);

	    return h3;
	}
function montali(dado, nomeClass) {
	  var li = document.createElement("li");
	  li.textContent = dado;
	  li.classList.add(nomeClass);

	  return li;
	}
	function calculaAnos(Nome, Aporte, Rent, RentAnual, Anos, divAnosjs, divRenAnosjs, divAnosFinais, divTituloEntrada){
		var ValorAcul = [];
		var ValorSemRen = [];
		var Porcentagem = [];
		var PorcentagemTotal = [];
		var PorcentagemAno = [];

		var Position = 0;

		var i = 0;
		var m = 0;
		var v = 0;

		while(i < Anos){
			if(i < Anos && v == 0){
				divTituloEntrada.appendChild(montah2(Nome + " Com R$" + Aporte + " de aportes mensais depositados todos os meses em um investimento que possua rentabilidade de "+ RentAnual +"% ao ano, você pode conseguir rentabilidades de: ", "tituloEntrada"));
				ValorAcul.push(0);
				PorcentagemTotal.push(0);
			}
			if(m==0 && i==0){
				Porcentagem.push(Aporte * Rent);
				ValorSemRen.push(Aporte);
			}else{
				Porcentagem.push(ValorAcul[Position].toFixed(2) * Rent);
				ValorSemRen.push(ValorSemRen[Position-1]+ Aporte);
			}
			ValorAcul.push(ValorAcul[Position] + Aporte + Porcentagem[Position]);
			PorcentagemTotal.push(PorcentagemTotal[Position]+Porcentagem[Position]);

			if(m==11){
				i++;
				m = 0;
				divAnosjs.appendChild(montaparagrafo("O valor acumulado no seu "+ i + " ano é de: R$"+ ValorAcul[Position+1].toFixed(2),"ValorAcul"));
				divAnosjs.appendChild(montaparagrafo("O valor sem rentabilidade no "+ i + " ano seria de: R$"+ ValorSemRen[Position],"ValorSemRen"));
				Position++;
				if(i-1 == 0){
					divRenAnosjs.appendChild(montaparagrafo("No "+ i + " ano a rentabilidade ganha foi de: R$"+ PorcentagemTotal[Position-1].toFixed(2),"PorcentagemAnual"));
					PorcentagemAno.push(PorcentagemTotal[Position-1]);
					var quantAnos = 0;
				}else{
					PorcentagemAno.push(PorcentagemTotal[Position-1]);
					divRenAnosjs.appendChild(montaparagrafo("No "+ i + " ano a rentabilidade ganha foi de: R$"+ (PorcentagemTotal[Position-1]-PorcentagemAno[quantAnos]).toFixed(2),"PorcentagemAnual"));
					quantAnos++;
				}
				divRenAnosjs.appendChild(montaparagrafo("No "+ i + " ano o valor acumulado é de: R$"+ PorcentagemTotal[Position-1].toFixed(2),"PorcentagemTotal"))
			}else{
				v++;
				m++;
				Position++;
			}
		}
		if(!(i < Anos)){
			divAnosFinais.appendChild(montah3("O valor total acumulados em "+ Anos +" anos com as rentabilidades é de: R$"+ ValorAcul[Position].toFixed(2),"tituloFinal"));
			divAnosFinais.appendChild(montah3("O valor total ganho com o investimento comparado a somente poupar é de: R$"+ PorcentagemTotal[Position-1].toFixed(2),"tituloFinalGanho"));
			console.log(Position);
			console.log(ValorAcul);
			console.log(ValorSemRen);
			console.log(vezesCalculadas);
			console.log(PorcentagemAno);
			console.log(PorcentagemTotal);
		}
	}

var botaoAdicionar = document.querySelector(".enviarInfo");
var vezesCalculadas = 0;

botaoAdicionar.addEventListener("click", function() {
    event.preventDefault();

    vezesCalculadas++;

	var divAnosjs = document.querySelector(".anosjs");
	var divRenAnosjs = document.querySelector(".renAnosjs");
	var divAnosFinais = document.querySelector(".titulosFinais");
	var divTituloEntrada = document.querySelector(".titulosEntrada");

	var inputNome = document.querySelector("#nomeSobrenome");
	var inputAporte = document.querySelector("#aporte");
	var inputAnos = document.querySelector("#anosInvestindo");
	var inputRent = document.querySelector("#rentabilidade");

	var Nome = inputNome.textContent;
	var Aporte = parseInt(inputAporte.value);
	var Anos = parseInt(inputAnos.value);
	var RentAnual = parseInt(inputRent.value);
	var RentMensal = RentAnual/12;
	var Rent = (RentMensal/100).toFixed(2);

	var erros = [];
	var escreveErros = document.querySelector(".erros");

	escreveErros.innerHTML = "";
	var form = document.querySelector(".dadosRendimento");
  form.reset();

	var AporteEhValido = validaAporte(Aporte);
	var AnosEhValido = validaAnos(Anos);
	var RentabilidadeEhValida = validaRentabilidade(RentAnual, Anos);

	if (AporteEhValido && AnosEhValido && RentabilidadeEhValida) {
	  calculaAnos(Nome, Aporte, Rent, RentAnual, Anos, divAnosjs, divRenAnosjs, divAnosFinais, divTituloEntrada);
	}else{
		if(AporteEhValido == false){
			erros.push("Aporte Inválido");
		}
		if(AnosEhValido == false){
			erros.push("Anos Inválido");
		}
		if(RentabilidadeEhValida == false){
			erros.push("Rentabilidade Inválida");
		}
		for(i = 0; i < erros.length; i++){
			escreveErros.appendChild(montali(erros[i],"erro"));
		}
	}
});