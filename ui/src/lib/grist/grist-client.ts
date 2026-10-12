/**
 * Grist API Client
 * Client pour interagir avec l'API Grist
 */

// Types pour les réponses Grist
export interface GristRecord<T = Record<string, any>> {
  id: number;
  fields: T;
}

export interface GristRecordsResponse<T = Record<string, any>> {
  records: GristRecord<T>[];
}

// Configuration Grist
const GRIST_CONFIG = {
  baseUrl:
    process.env.NEXT_PUBLIC_GRIST_BASE_URL ||
    "https://grist.numerique.gouv.fr/api",
  docId: process.env.NEXT_PUBLIC_GRIST_DOC_ID || "abrukV9rnpstUXcusj2JPa",
  apiKey: process.env.GRIST_API_KEY || "",
};

/**
 * Client Grist pour récupérer les données
 */
export class GristClient {
  private baseUrl: string;
  private docId: string;
  private apiKey: string;

  constructor(config?: Partial<typeof GRIST_CONFIG>) {
    this.baseUrl = config?.baseUrl || GRIST_CONFIG.baseUrl;
    this.docId = config?.docId || GRIST_CONFIG.docId;
    this.apiKey = config?.apiKey || GRIST_CONFIG.apiKey;

    console.log("GristClient initialized with:", {
      baseUrl: this.baseUrl,
      docId: this.docId,
      apiKeySet: !!this.apiKey ? "renseigné" : "non renseigné",
    });
  }

  /**
   * Récupère les records d'une table
   * @param tableName Nom de la table
   * @param filter Filtre optionnel au format JSON (ex: {"field": [value]})
   * @returns Liste des records
   */
  async getRecords<T = Record<string, any>>(
    tableName: string,
    filter?: Record<string, any>,
  ): Promise<T[]> {
    let url = `${this.baseUrl}/docs/${this.docId}/tables/${tableName}/records`;

    if (filter) {
      const filterParam = encodeURIComponent(JSON.stringify(filter));
      url += `?filter=${filterParam}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Grist API error details:", {
        status: response.status,
        statusText: response.statusText,
        url: url,
        errorBody: errorText,
      });
      throw new Error(
        `Grist API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data.records;
  }

  /**
   * Récupère un record spécifique par ID
   * @param tableName Nom de la table
   * @param recordId ID du record
   * @returns Le record
   */
  async getRecord<T = Record<string, any>>(
    tableName: string,
    recordId: number,
  ): Promise<T> {
    return this.getRecords<T>(tableName, { id: [recordId] }).then((records) => {
      if (records.length === 0) {
        throw new Error(
          `Record with ID ${recordId} not found in table ${tableName}`,
        );
      }
      return records[0];
    });
  }

  /**
   * Génère l'URL de téléchargement pour un attachment
   * @param attachmentId ID de l'attachment
   * @returns URL de téléchargement
   */
  getAttachmentDownloadUrl(attachmentId: number): string {
    return `${this.baseUrl}/docs/${this.docId}/attachments/${attachmentId}/download`;
  }

  /**
   * Télécharge un attachment depuis Grist
   * @param attachmentId ID de l'attachment
   * @returns Response de fetch avec le fichier
   */
  async downloadAttachment(attachmentId: number): Promise<Response> {
    const url = `${this.baseUrl}/docs/${this.docId}/attachments/${attachmentId}/download`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      console.error("Grist download error:", {
        status: response.status,
        statusText: response.statusText,
        url,
      });
      throw new Error(
        `Grist download error: ${response.status} ${response.statusText}`,
      );
    }

    return response;
  }
}

// Instance par défaut
export const gristClient = new GristClient();
