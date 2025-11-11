import { UserService } from "./user";
import { CartaoService } from "./cartao";
import { PixService } from "./pix";
import { BoletoService } from "./boleto";

// Instâncias compartilhadas dos serviços (singleton pattern)
let userServiceInstance: UserService | null = null;
let cartaoServiceInstance: CartaoService | null = null;
let pixServiceInstance: PixService | null = null;
let boletoServiceInstance: BoletoService | null = null;

export function getSharedUserService(): UserService {
  if (!userServiceInstance) {
    userServiceInstance = new UserService();
  }
  return userServiceInstance;
}

export function getSharedCartaoService(): CartaoService {
  if (!cartaoServiceInstance) {
    cartaoServiceInstance = new CartaoService();
  }
  return cartaoServiceInstance;
}

export function getSharedPixService(): PixService {
  if (!pixServiceInstance) {
    pixServiceInstance = new PixService();
  }
  return pixServiceInstance;
}

export function getSharedBoletoService(): BoletoService {
  if (!boletoServiceInstance) {
    boletoServiceInstance = new BoletoService();
  }
  return boletoServiceInstance;
}

