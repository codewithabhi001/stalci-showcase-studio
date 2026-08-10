# SEED-001: Multi-Tenant Sub-Agency Workspaces & Multi-Entity Payroll

## Trigger Condition
- **Trigger:** When starting Milestone 2 (Multi-Agency Expansion & Enterprise Scaling).
- **Target Phase:** Milestone 2 - Multi-Tenant Workspace Infrastructure.

## Core Objective
Enable Stalci Studio to operate as a multi-entity software holding company managing multiple sub-agencies, child business units, and international branch payrolls from a single central master Admin Panel.

## Key Features & Deliverables
1. **Tenant Context Isolation**: Schema-level or row-level tenant ID separation (`tenantId`) across all NestJS entities.
2. **Multi-Entity HR & Payroll**: Manage separate tax rules, currencies (USD, EUR, GBP, INR), and banking routing for different corporate entities.
3. **Role-Based Tenant Access**: Admins can switch between workspace context (e.g. *Stalci US Inc.*, *Stalci India R&D*, *Stalci UK Operations*).

---
*Planted: 2026-08-10 | Status: Planted*
