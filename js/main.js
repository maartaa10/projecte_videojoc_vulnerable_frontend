class Mario {
    constructor(element) {
      this.element = element;
      this.posicio = { x: 50, y: 0 };
      this.estaSaltant = false;
      this.alcadaSalt = 100;
      this.velocitatSalt = 20;
      this.pas = 10;
      this.frame = 5;
      this.element.style.backgroundPosition = `-${this.frame * 16}px 0px`;
      this.actualitzarPosicio();
    }
  
    moure(direccio) {
      const jocElement = document.querySelector('.joc'); 
      if (direccio === 'esquerra' && this.posicio.x > 0) {
        this.posicio.x -= this.pas;
        this.element.style.transform = 'scale(-2, 2)'; 
        
        const posicioFonsActual = parseInt(getComputedStyle(jocElement).backgroundPositionX || 0, 10);
        jocElement.style.backgroundPositionX = `${posicioFonsActual + this.pas}px`;
      } else if (direccio === 'dreta') {
        this.posicio.x += this.pas;
        this.element.style.transform = 'scale(2)'; 
       
        const posicioFonsActual = parseInt(getComputedStyle(jocElement).backgroundPositionX || 0, 10);
        jocElement.style.backgroundPositionX = `${posicioFonsActual - this.pas}px`;
      }
    
      if (this.frame <= 5) this.frame = 6;
      else this.frame = (this.frame + 1) % 9;
      this.element.style.backgroundPosition = `-${this.frame * 16}px 0px`;
    
      this.actualitzarPosicio();
    }
  
    saltar() {
      if (this.estaSaltant) return;
  
      this.estaSaltant = true;
      let intervalAmunt = setInterval(() => {
        if (this.posicio.y >= this.alcadaSalt) {
          clearInterval(intervalAmunt);
          let intervalAvall = setInterval(() => {
            if (this.posicio.y <= 0) {
              clearInterval(intervalAvall);
              this.posicio.y = 0;
              this.estaSaltant = false;
            } else {
              this.posicio.y -= this.velocitatSalt;
            }
            this.actualitzarPosicio();
          }, 20);
        } else {
          this.posicio.y += this.velocitatSalt;
          this.actualitzarPosicio();
        }
      }, 20);
    }
  
    actualitzarPosicio() {
      this.element.style.left = `${this.posicio.x}px`;
      this.element.style.bottom = `${this.posicio.y}px`;
    }
  }
  
  const elementMario = document.querySelector('.mario');
  const mario = new Mario(elementMario);
  
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      mario.moure('esquerra');
    } else if (event.key === 'ArrowRight') {
      mario.moure('dreta');
    } else if (event.key === 'ArrowUp') {
      mario.saltar();
    }
  });
  



  