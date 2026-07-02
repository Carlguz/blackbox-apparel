import nodemailer, { type Transporter } from "nodemailer";
import type { NotificationsConfig, SiteContentData } from "@/components/blackbox/content";

/**
 * Sends an email notification when a new order arrives.
 * Reads SMTP config from the site content.
 */
export async function sendOrderNotificationEmail(
  content: SiteContentData,
  order: {
    id: string;
    productName: string;
    productPrice: string;
    size?: string | null;
    quantity?: number;
    total: string;
    customerName?: string | null;
    customerPhone?: string;
    source?: string | null;
  }
): Promise<{ ok: boolean; error?: string }> {
  const n = content.notifications;
  if (!n.emailEnabled) return { ok: false, error: "Email notifications disabled" };
  if (!n.notifyEmail || !n.smtpUser || !n.smtpPassword || !n.smtpHost) {
    return { ok: false, error: "SMTP config incomplete" };
  }

  let transporter: Transporter;
  try {
    transporter = nodemailer.createTransport({
      host: n.smtpHost,
      port: parseInt(n.smtpPort) || 465,
      secure: (parseInt(n.smtpPort) || 465) === 465,
      auth: { user: n.smtpUser, pass: n.smtpPassword },
    });
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }

  const subject = `🛒 Nuevo pedido: ${order.productName}`;
  const html = `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9;">
      <div style="background: #000; color: #fff; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 22px; letter-spacing: 0.05em;">BLACKBOX APPAREL</h1>
        <p style="margin: 4px 0 0; opacity: 0.6; font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em;">Nuevo pedido recibido</p>
      </div>
      <div style="background: #fff; padding: 32px 24px;">
        <h2 style="margin: 0 0 16px; color: #000; font-size: 20px;">${order.productName}</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #666; width: 40%;">ID Pedido:</td><td style="padding: 8px 0; color: #000; font-family: monospace;">${order.id}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Producto:</td><td style="padding: 8px 0; color: #000;">${order.productName}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Precio:</td><td style="padding: 8px 0; color: #000;">${order.productPrice}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Talla:</td><td style="padding: 8px 0; color: #000;">${order.size || "—"}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Cantidad:</td><td style="padding: 8px 0; color: #000;">${order.quantity || 1}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Total:</td><td style="padding: 8px 0; color: #000; font-weight: bold;">${order.total}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Cliente:</td><td style="padding: 8px 0; color: #000;">${order.customerName || "Pendiente"}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Teléfono:</td><td style="padding: 8px 0; color: #000;">${order.customerPhone || "Pendiente"}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Origen:</td><td style="padding: 8px 0; color: #000;">${order.source || "landing"}</td></tr>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #f3f3f3; border-left: 3px solid #25D366;">
          <p style="margin: 0; font-size: 13px; color: #444;">Revisa el panel de administración para gestionar este pedido.</p>
        </div>
      </div>
      <div style="text-align: center; padding: 16px; color: #666; font-size: 11px;">
        © ${new Date().getFullYear()} BLACKBOX APPAREL · Notificación automática
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: n.smtpFrom,
      to: n.notifyEmail,
      subject,
      html,
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/**
 * Builds a WhatsApp link to the internal notification number with the order details.
 * The admin clicks it and WhatsApp opens with a pre-filled message.
 */
export function buildInternalWhatsAppLink(
  notifyWhatsapp: string,
  order: {
    id: string;
    productName: string;
    productPrice: string;
    size?: string | null;
    quantity?: number;
    total: string;
    customerName?: string | null;
    customerPhone?: string;
  }
): string {
  const msg = `🛒 NUEVO PEDIDO BLACKBOX

ID: ${order.id}
Producto: ${order.productName} (${order.productPrice})
Talla: ${order.size || "—"}
Cantidad: ${order.quantity || 1}
Total: ${order.total}

Cliente: ${order.customerName || "Pendiente"}
Teléfono: ${order.customerPhone || "Pendiente"}

Revisa el panel admin para gestionar.`;
  return `https://wa.me/${notifyWhatsapp}?text=${encodeURIComponent(msg)}`;
}
