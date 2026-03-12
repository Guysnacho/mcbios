export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4";
  };
  public: {
    Tables: {
      confirm_request: {
        Row: {
          created_at: string;
          id: number;
          org_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          org_id?: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          org_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "confirm_request_user_id_org_id_fkey";
            columns: ["user_id", "org_id"];
            isOneToOne: false;
            referencedRelation: "member";
            referencedColumns: ["user_id", "org_id"];
          },
        ];
      };
      form: {
        Row: {
          created_at: string;
          id: string;
          meta: Json | null;
          org_id: string;
          schema: string | null;
          type: Database["public"]["Enums"]["form_type"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          meta?: Json | null;
          org_id: string;
          schema?: string | null;
          type: Database["public"]["Enums"]["form_type"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          meta?: Json | null;
          org_id?: string;
          schema?: string | null;
          type?: Database["public"]["Enums"]["form_type"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "form_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organization";
            referencedColumns: ["id"];
          },
        ];
      };
      form_uploads: {
        Row: {
          created_at: string;
          form_id: string | null;
          id: string;
          name: string | null;
          org_id: string;
          public_url: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          form_id?: string | null;
          id: string;
          name?: string | null;
          org_id: string;
          public_url?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          form_id?: string | null;
          id?: string;
          name?: string | null;
          org_id?: string;
          public_url?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "form_uploads_form_id_fkey";
            columns: ["form_id"];
            isOneToOne: false;
            referencedRelation: "form";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "form_uploads_user_id_org_id_fkey";
            columns: ["user_id", "org_id"];
            isOneToOne: false;
            referencedRelation: "member";
            referencedColumns: ["user_id", "org_id"];
          },
        ];
      };
      member: {
        Row: {
          attended: number[];
          email: string | null;
          fees_paid_at: string | null;
          fname: string;
          institution: string;
          lname: string;
          org_id: string;
          role: Database["public"]["Enums"]["user_role"];
          user_id: string;
        };
        Insert: {
          attended?: number[];
          email?: string | null;
          fees_paid_at?: string | null;
          fname: string;
          institution?: string;
          lname: string;
          org_id: string;
          role?: Database["public"]["Enums"]["user_role"];
          user_id: string;
        };
        Update: {
          attended?: number[];
          email?: string | null;
          fees_paid_at?: string | null;
          fname?: string;
          institution?: string;
          lname?: string;
          org_id?: string;
          role?: Database["public"]["Enums"]["user_role"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "member_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: false;
            referencedRelation: "organization";
            referencedColumns: ["id"];
          },
        ];
      };
      organization: {
        Row: {
          base_url: string;
          cre_ts: string;
          id: string;
          name: string;
          short_name: string | null;
        };
        Insert: {
          base_url: string;
          cre_ts?: string;
          id?: string;
          name: string;
          short_name?: string | null;
        };
        Update: {
          base_url?: string;
          cre_ts?: string;
          id?: string;
          name?: string;
          short_name?: string | null;
        };
        Relationships: [];
      };
      raw_registration: {
        Row: {
          created_at: string;
          email: string;
          fname: string;
          institution: string;
          lname: string;
          org_id: string;
          role: Database["public"]["Enums"]["user_role"];
        };
        Insert: {
          created_at?: string;
          email: string;
          fname: string;
          institution?: string;
          lname: string;
          org_id?: string;
          role: Database["public"]["Enums"]["user_role"];
        };
        Update: {
          created_at?: string;
          email?: string;
          fname?: string;
          institution?: string;
          lname?: string;
          org_id?: string;
          role?: Database["public"]["Enums"]["user_role"];
        };
        Relationships: [];
      };
      submission: {
        Row: {
          created_at: string;
          data: Json;
          form_id: string;
          id: string;
          updated_at: string;
          uploads: string[] | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          data: Json;
          form_id: string;
          id?: string;
          updated_at?: string;
          uploads?: string[] | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          data?: Json;
          form_id?: string;
          id?: string;
          updated_at?: string;
          uploads?: string[] | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "submission_form_id_fkey";
            columns: ["form_id"];
            isOneToOne: false;
            referencedRelation: "form";
            referencedColumns: ["id"];
          },
        ];
      };
      videos: {
        Row: {
          date: string;
          id: number;
          org_id: string;
          path: string;
          title: string;
        };
        Insert: {
          date: string;
          id?: number;
          org_id?: string;
          path: string;
          title: string;
        };
        Update: {
          date?: string;
          id?: number;
          org_id?: string;
          path?: string;
          title?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      append_current_year_to_attended: {
        Args: { target_user: string };
        Returns: {
          attended: number[];
          email: string | null;
          fees_paid_at: string | null;
          fname: string;
          institution: string;
          lname: string;
          org_id: string;
          role: Database["public"]["Enums"]["user_role"];
          user_id: string;
        };
        SetofOptions: {
          from: "*";
          to: "member";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      get_submission: {
        Args: { p_submission_id: string };
        Returns: {
          id: string;
          member: Json;
          submission: Json;
        }[];
      };
      get_submissions: {
        Args: { p_form_id: string };
        Returns: {
          id: string;
          member: Json;
          submission: Json;
        }[];
      };
      get_user_id: { Args: never; Returns: string };
      get_user_org_id: { Args: never; Returns: string };
      is_admin: { Args: never; Returns: boolean };
      update_fname: { Args: { new_fname: string }; Returns: undefined };
      update_lname: { Args: { new_lname: string }; Returns: undefined };
      upsert_submission: {
        Args: { p_data: Json; p_form_id: string; p_user_id: string };
        Returns: {
          data: Json;
          form_id: string;
          id: string;
          updated_at: string;
          user_id: string;
        }[];
      };
    };
    Enums: {
      form_type: "abstract" | "session" | "general";
      user_role: "professional" | "student" | "admin" | "postdoctorial";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      form_type: ["abstract", "session", "general"],
      user_role: ["professional", "student", "admin", "postdoctorial"],
    },
  },
} as const;
