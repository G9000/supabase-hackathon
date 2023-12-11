export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      food_preferences: {
        Row: {
          allergy: string[] | null
          cooking_time_preference: Json | null
          created_at: string
          cuisine: string[] | null
          dietary_needs: string | null
          dietary_requirements: Json | null
          dislikes: string[] | null
          favorite_ingredients: string[] | null
          frequency_of_certain_foods: Json | null
          health_goals: Json | null
          id: number
          likes: string[] | null
          meal_preferences: Json | null
          organic_preference: boolean
          portion_sizes: number | null
          skill_level: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          allergy?: string[] | null
          cooking_time_preference?: Json | null
          created_at?: string
          cuisine?: string[] | null
          dietary_needs?: string | null
          dietary_requirements?: Json | null
          dislikes?: string[] | null
          favorite_ingredients?: string[] | null
          frequency_of_certain_foods?: Json | null
          health_goals?: Json | null
          id?: number
          likes?: string[] | null
          meal_preferences?: Json | null
          organic_preference?: boolean
          portion_sizes?: number | null
          skill_level?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          allergy?: string[] | null
          cooking_time_preference?: Json | null
          created_at?: string
          cuisine?: string[] | null
          dietary_needs?: string | null
          dietary_requirements?: Json | null
          dislikes?: string[] | null
          favorite_ingredients?: string[] | null
          frequency_of_certain_foods?: Json | null
          health_goals?: Json | null
          id?: number
          likes?: string[] | null
          meal_preferences?: Json | null
          organic_preference?: boolean
          portion_sizes?: number | null
          skill_level?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "food_preferences_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      grocery: {
        Row: {
          budget: number | null
          created_at: string
          currency: string | null
          description: string | null
          estimated_savings: number | null
          id: string
          name: string | null
          portion_sizes: number | null
          recipe: string[] | null
          repeatable: boolean
          total_spending: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          budget?: number | null
          created_at?: string
          currency?: string | null
          description?: string | null
          estimated_savings?: number | null
          id?: string
          name?: string | null
          portion_sizes?: number | null
          recipe?: string[] | null
          repeatable?: boolean
          total_spending?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          budget?: number | null
          created_at?: string
          currency?: string | null
          description?: string | null
          estimated_savings?: number | null
          id?: string
          name?: string | null
          portion_sizes?: number | null
          recipe?: string[] | null
          repeatable?: boolean
          total_spending?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grocery_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      grocery_item: {
        Row: {
          created_at: string
          done: boolean
          grocery_list_id: string | null
          id: number
          name: string | null
          price_per_unit: number | null
          quantity: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          done?: boolean
          grocery_list_id?: string | null
          id?: number
          name?: string | null
          price_per_unit?: number | null
          quantity?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          done?: boolean
          grocery_list_id?: string | null
          id?: number
          name?: string | null
          price_per_unit?: number | null
          quantity?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grocery_item_grocery_list_id_fkey"
            columns: ["grocery_list_id"]
            referencedRelation: "grocery_list"
            referencedColumns: ["id"]
          }
        ]
      }
      grocery_list: {
        Row: {
          completed: boolean
          created_at: string
          grocery_id: string | null
          id: string
          schedule_on: string | null
          total_spending: number | null
          updated_at: string | null
        }
        Insert: {
          completed?: boolean
          created_at?: string
          grocery_id?: string | null
          id?: string
          schedule_on?: string | null
          total_spending?: number | null
          updated_at?: string | null
        }
        Update: {
          completed?: boolean
          created_at?: string
          grocery_id?: string | null
          id?: string
          schedule_on?: string | null
          total_spending?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grocery_list_grocery_id_fkey"
            columns: ["grocery_id"]
            referencedRelation: "grocery"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          age: number | null
          created_at: string
          currency: string | null
          display_name: string | null
          email: string | null
          gender: string | null
          id: string
          nationality: string | null
          total_spending: number | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string
          currency?: string | null
          display_name?: string | null
          email?: string | null
          gender?: string | null
          id: string
          nationality?: string | null
          total_spending?: number | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string
          currency?: string | null
          display_name?: string | null
          email?: string | null
          gender?: string | null
          id?: string
          nationality?: string | null
          total_spending?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

