// Netflix e Spotify

// Importação de clientes via CSV (Excel)
// 1gb - 1.000.000
// POST /upload import.csv

// 10mb/s -- 100s

// 100s -> Inserções no banco de dados

// 10mb/s -> 10.000 

// Readable Streams / Writable Streams

// Streams -> 

// process.stdin.pipe(process.stdout)

// Testes
// Unitários: unidade da sua aplicação
// Integração: comunicação entre duas ou mais unidades
// E2E - ponta a ponta: sumulam um usuário operando na nossa aplicação

// front-end: abre a página de login, digite o texto vinicius@gmail.com no campo com ID email, clique no botão
// back-end: chamadas HTTP, WebSockets

// Pirâmide de testes: E2E (não dependem de nenhuma tecnologia, não dependem  de arquitetura)

// DDD (Domain-driven Design)
// Design dirigido à domínio

// Domínio

// - Domain Experts
//  - Conversa
// - Linguagem ubíqua

// - Usuário
//  - Cliente
//  - Fornecedor
//  - Atendente
//  - Barman

// - Agregados
// - Value Objects
// - Eventos de domínio
// - Subdomínios (Bounded Contexts)
// - Entidades
// - Casos de uso

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable{
  index = 1
  _read() {
    const i = this.index++

    setTimeout(() => {
      if(i > 100){
        this.push(null)
      } else {
        const buf = Buffer.from(String(i)) 
  
        this.push(buf)
      }
    }, 1000)
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const tranformed = Number(chunk.toString()) * -1
    callback(null, Buffer.from(String(tranformed)))
  }  
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())
