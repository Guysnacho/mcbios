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
      billing_email_log: {
        Row: {
          created_at: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
        };
        Relationships: [];
      };
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
      connect_account: {
        Row: {
          access_until: string | null;
          account_link: string | null;
          country_code: string;
          created_at: string;
          id: string;
          livemode: boolean;
          org_id: string | null;
          subscription_id: string | null;
          subscription_status: string | null;
          subscription_type:
            Database["public"]["Enums"]["subscription_type"] | null;
          updated_at: string;
          usage: Json;
        };
        Insert: {
          access_until?: string | null;
          account_link?: string | null;
          country_code: string;
          created_at?: string;
          id: string;
          livemode?: boolean;
          org_id?: string | null;
          subscription_id?: string | null;
          subscription_status?: string | null;
          subscription_type?:
            Database["public"]["Enums"]["subscription_type"] | null;
          updated_at?: string;
          usage?: Json;
        };
        Update: {
          access_until?: string | null;
          account_link?: string | null;
          country_code?: string;
          created_at?: string;
          id?: string;
          livemode?: boolean;
          org_id?: string | null;
          subscription_id?: string | null;
          subscription_status?: string | null;
          subscription_type?:
            Database["public"]["Enums"]["subscription_type"] | null;
          updated_at?: string;
          usage?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "connect_account_org_id_fkey";
            columns: ["org_id"];
            isOneToOne: true;
            referencedRelation: "organization";
            referencedColumns: ["id"];
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
      mail_queue: {
        Row: {
          created_at: string | null;
          job_data: Json;
          job_id: string;
          max_retries: number | null;
          priority: number | null;
          retry_count: number | null;
          scheduled_at: string | null;
          status: Database["public"]["Enums"]["email_status"];
        };
        Insert: {
          created_at?: string | null;
          job_data: Json;
          job_id?: string;
          max_retries?: number | null;
          priority?: number | null;
          retry_count?: number | null;
          scheduled_at?: string | null;
          status?: Database["public"]["Enums"]["email_status"];
        };
        Update: {
          created_at?: string | null;
          job_data?: Json;
          job_id?: string;
          max_retries?: number | null;
          priority?: number | null;
          retry_count?: number | null;
          scheduled_at?: string | null;
          status?: Database["public"]["Enums"]["email_status"];
        };
        Relationships: [];
      };
      mail_queue_logs: {
        Row: {
          created_at: string;
          job_id: string | null;
          level: string;
          log_id: number;
          message: string;
          meta: Json | null;
        };
        Insert: {
          created_at?: string;
          job_id?: string | null;
          level: string;
          log_id?: number;
          message: string;
          meta?: Json | null;
        };
        Update: {
          created_at?: string;
          job_id?: string | null;
          level?: string;
          log_id?: number;
          message?: string;
          meta?: Json | null;
        };
        Relationships: [];
      };
      member: {
        Row: {
          attended: number[];
          created_at: string | null;
          email: string | null;
          fees_paid_at: string | null;
          fname: string;
          institution: string;
          lname: string;
          org_id: string;
          role: Database["public"]["Enums"]["user_role"];
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          attended?: number[];
          created_at?: string | null;
          email?: string | null;
          fees_paid_at?: string | null;
          fname: string;
          institution?: string;
          lname: string;
          org_id: string;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          attended?: number[];
          created_at?: string | null;
          email?: string | null;
          fees_paid_at?: string | null;
          fname?: string;
          institution?: string;
          lname?: string;
          org_id?: string;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string | null;
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
          conference_date: string | null;
          cre_ts: string;
          id: string;
          name: string;
          registration_start_date: string | null;
          short_name: string | null;
        };
        Insert: {
          base_url: string;
          conference_date?: string | null;
          cre_ts?: string;
          id?: string;
          name: string;
          registration_start_date?: string | null;
          short_name?: string | null;
        };
        Update: {
          base_url?: string;
          conference_date?: string | null;
          cre_ts?: string;
          id?: string;
          name?: string;
          registration_start_date?: string | null;
          short_name?: string | null;
        };
        Relationships: [];
      };
      plan_limits: {
        Row: {
          admin_seats: number | null;
          forms: number | null;
          max_file_size: number | null;
          members: number | null;
          registrations: number | null;
          tier: string;
          upload_storage: number | null;
        };
        Insert: {
          admin_seats?: number | null;
          forms?: number | null;
          max_file_size?: number | null;
          members?: number | null;
          registrations?: number | null;
          tier: string;
          upload_storage?: number | null;
        };
        Update: {
          admin_seats?: number | null;
          forms?: number | null;
          max_file_size?: number | null;
          members?: number | null;
          registrations?: number | null;
          tier?: string;
          upload_storage?: number | null;
        };
        Relationships: [];
      };
      plan_settings: {
        Row: { key: string; value: number };
        Insert: { key: string; value: number };
        Update: { key?: string; value?: number };
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
      platform_meta: {
        Row: {
          organization: Json | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      append_current_year_to_attended: {
        Args: { target_user: string };
        Returns: {
          attended: number[];
          created_at: string | null;
          email: string | null;
          fees_paid_at: string | null;
          fname: string;
          institution: string;
          lname: string;
          org_id: string;
          role: Database["public"]["Enums"]["user_role"];
          updated_at: string | null;
          user_id: string;
        };
        SetofOptions: {
          from: "*";
          to: "member";
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      apply_registration_payment: {
        Args: {
          p_email: string;
          p_fname?: string;
          p_institution?: string;
          p_lname?: string;
          p_org_id: string;
          p_paid_at: string;
          p_role: Database["public"]["Enums"]["user_role"];
          p_user_id?: string;
        };
        Returns: {
          member_user_id: string;
          was_applied: boolean;
          was_created: boolean;
        }[];
      };
      cleanup_mail_queue_logs: { Args: never; Returns: number };
      decrement_jsonb_int_key: {
        Args: {
          p_column: string;
          p_delta?: number;
          p_floor?: number;
          p_key: string;
          p_pk_column: string;
          p_pk_value: string;
          p_table: string;
        };
        Returns: undefined;
      };
      dequeue_and_run_email_jobs: { Args: never; Returns: undefined };
      fetch_member_by_email_org: {
        Args: { p_email: string; p_org_id: string };
        Returns: {
          authed: boolean;
          email: string;
          org_id: string;
          role: Database["public"]["Enums"]["user_role"];
        }[];
      };
      file_cleanup: { Args: never; Returns: undefined };
      form_plan_ok: { Args: { p_form: string }; Returns: boolean };
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
      increment_jsonb_int_key: {
        Args: {
          p_column: string;
          p_delta?: number;
          p_key: string;
          p_pk_column: string;
          p_pk_value: string;
          p_table: string;
        };
        Returns: undefined;
      };
      is_paid_this_cycle: {
        Args: { p_fees_paid_at: string; p_org: string };
        Returns: boolean;
      };
      member_paid_this_cycle: {
        Args: { p_email?: string; p_org: string; p_user_id?: string };
        Returns: boolean;
      };
      my_membership: {
        Args: { p_org: string };
        Returns: {
          fees_paid_at: string;
          paid_this_cycle: boolean;
          registration_open: boolean;
          role: Database["public"]["Enums"]["user_role"];
        }[];
      };
      org_admin_seats_full: { Args: { p_org: string }; Returns: boolean };
      org_forms_full: { Args: { p_org: string }; Returns: boolean };
      org_members_full: { Args: { p_org: string }; Returns: boolean };
      org_registrations_full: { Args: { p_org: string }; Returns: boolean };
      org_subscription_active: { Args: { p_org: string }; Returns: boolean };
      org_tier: { Args: { p_org: string }; Returns: string };
      registration_guard: {
        Args: { p_email?: string; p_org: string; p_user_id?: string };
        Returns: string;
      };
      registration_open: {
        Args: { p_on?: string; p_org: string };
        Returns: boolean;
      };
      is_admin: { Args: never; Returns: boolean };
      is_org_admin: { Args: { p_org: string }; Returns: boolean };
      is_org_member: { Args: { p_org: string }; Returns: boolean };
      org_plan_ok: { Args: { p_org: string }; Returns: boolean };
      org_upload_bytes: { Args: { p_org: string }; Returns: number };
      patch_jsonb_key: {
        Args: {
          p_column: string;
          p_key: string;
          p_pk_column: string;
          p_pk_value: string;
          p_table: string;
          p_value: Json;
        };
        Returns: undefined;
      };
      refresh_platform_meta: { Args: never; Returns: undefined };
      send_email: { Args: { event: Json }; Returns: Json };
      submission_object_readable: {
        Args: { p_name: string };
        Returns: boolean;
      };
      submission_path_ok: { Args: { p_name: string }; Returns: boolean };
      submission_path_parts: {
        Args: { p_name: string };
        Returns: Record<string, unknown>;
      };
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
      upsert_submission_unauthed: {
        Args: {
          p_form_id: string;
          p_org_id: string;
          p_submission: Json;
          p_user_json: Json;
        };
        Returns: {
          out_form_id: string;
          out_user_id: string;
          submission_data: Json;
          submission_id: string;
          submission_updated_at: string;
        }[];
      };
    };
    Enums: {
      email_status: "pending" | "processing" | "success" | "failed";
      form_type: "abstract" | "session" | "general" | "registration";
      subscription_type:
        | "professional_monthly"
        | "professional_annual"
        | "frontier_monthly"
        | "frontier_annual"
        | "advanced_monthly"
        | "advanced_annual"
        | "event_pass"
        | "enterprise";
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      email_status: ["pending", "processing", "success", "failed"],
      form_type: ["abstract", "session", "general", "registration"],
      subscription_type: [
        "professional_monthly",
        "professional_annual",
        "frontier_monthly",
        "frontier_annual",
        "advanced_monthly",
        "advanced_annual",
        "event_pass",
        "enterprise",
      ],
      user_role: ["professional", "student", "admin", "postdoctorial"],
    },
  },
} as const;
