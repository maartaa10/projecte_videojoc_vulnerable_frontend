(function() {
    if (typeof Mario === 'undefined')
      window.Mario = {};
  
    var Sprite = Mario.Sprite = function(img, pos, mida, velocitat, fotogrames, unaVegada) {
      this.pos = pos;
      this.mida = mida;
      this.velocitat = velocitat;
      this._index = 0;
      this.img = img;
      this.unaVegada = unaVegada;
      this.fotogrames = fotogrames;
    }
  
    Sprite.prototype.actualitzar = function(dt, tempsDeJoc) {
      if (tempsDeJoc && tempsDeJoc == this.últimaActualització) return;
      this._index += this.velocitat * dt;
      if (tempsDeJoc) this.últimaActualització = tempsDeJoc;
    }
  
    Sprite.prototype.setFrame = function(fotograma) {
      this._index = fotograma;
    }
  
    Sprite.prototype.renderitzar = function(ctx, posx, posy, vX, vY) {
      var fotograma;
  
      if (this.velocitat > 0) {
        var màxim = this.fotogrames.length;
        var idx = Math.floor(this._index);
        fotograma = this.fotogrames[idx % màxim];
  
        if (this.unaVegada && idx >= màxim) {
          this.acabat = true;
          return;
        }
      } else {
        fotograma = 0;
      }
  
      var x = this.pos[0];
      var y = this.pos[1];
  
      x += fotograma * this.mida[0];
      ctx.drawImage(resources.get(this.img), x + (1/3), y + (1/3), this.mida[0] - (2/3), this.mida[1] - (2/3), Math.round(posx - vX), Math.round(posy - vY), this.mida[0], this.mida[1]);
    }
  })();