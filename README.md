


# Tes Insurance Agency

[![Formspree] (https://formspree.io/forms/xzzaowkq/submissions)](<LINK>) 

Modern insurance agency platform (marketing site → instant quote).  
Stack: React (Vite) + Tailwind. Roadmap: backend (Postgres + Prisma), client portal, and rater integrations.


```mermaid
classDiagram
  class User {
    +string userId
    +string email
    +string passwordHash
    +string role
    +Date createdAt
    +Date lastLogin
    +list<Lead> leads
  }

  class Lead {
    +string leadId
    +ref user
    +string name
    +string email
    +string phone
    +string zip
    +string coverageType
    +string details
    +string status
    +Date createdAt
    +Date updatedAt
  }

  class Quote {
    +string quoteId
    +ref lead
    +string carrier
    +int premium
    +dict limits
    +dict deductibles
    +list<string> documents
    +string status
    +Date createdAt
  }

  class carrier {
    +name: str
    +logoUrl: str
    +products: list[str] (Auto, Home, GL, etc.)
    +apiEnabled: bool
    +contactInfo: dict
  }

  class logs {
    +logId: str
    +author: ref
    +action: str
    +entityType: str (lead, quote, user)
    +entityId: str
    +details: str
    +loggedAt: Date
  }

  class policies {
    +policyId: str
    +quote: ref
    +carrier: ref
    +effectiveDate: Date
    +expirationDate: Date
    +premium: int
    +documents: list[str]
    +status: str (active, canceled, expired)
  }

  User --> Lead
  Lead --> Quote
  Quote --> carrier
  carrier --> logs
  logs --> policies

