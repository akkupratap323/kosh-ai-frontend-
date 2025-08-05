# 🔥 SINGLE UPLOAD MODE - Most Recent Files Only

## 🎯 **What This Does**
Processes reconciliation ONLY on the **most recent single bank statement file** and **most recent invoices** you just uploaded to the cloud, ignoring all historical data.

## ✅ **Perfect for Your Use Case**
- Upload 20 bank statements → System focuses ONLY on these 20
- Upload 3 invoices → System focuses ONLY on these 3  
- Reconciliation matches the 20 statements with 3 invoices
- Shows detailed results for ONLY this fresh data

## 🔧 **How It Works**

### 1. **Smart Upload Detection**
```sql
-- Finds the most recent upload timestamp
SELECT MAX(processed_at) as latest_time
FROM bank_statements 
WHERE processed_at >= LAST 24 HOURS

-- Gets ONLY records from that upload batch (within 5 minutes)
WHERE processed_at >= (latest_time - 5 minutes)
```

### 2. **Frontend Controls**
- **🔥 SINGLE UPLOAD MODE:** ✅ Checked by default
- **Processing Message:** "🤖 AI Engine Processing SINGLE UPLOAD..."
- **Status:** "🔥 Processing ONLY most recent upload batch"

### 3. **Backend Logic**
- `uploadBatchOnly: true` → Calls `getLatestUploadInvoices()` and `getLatestUploadBankStatements()`
- Ignores timeframe settings when single upload mode is enabled
- Focuses on records uploaded within last 5 minutes of the most recent upload

## 🚀 **User Experience**

### Step 1: Upload Files
1. Upload bank statement file (20 transactions)
2. Fetch invoices from Odoo (3 invoices)

### Step 2: Run Reconciliation
1. **🔥 SINGLE UPLOAD MODE** is checked ✅
2. Click "🚀 Start Advanced AI Reconciliation"
3. See: "🤖 AI Engine Processing SINGLE UPLOAD..."

### Step 3: See Results
1. "🎉 AI Reconciliation Complete - SINGLE UPLOAD Records!"
2. Shows matches found from ONLY the 20 statements + 3 invoices
3. Detailed results auto-display immediately

## 🔍 **Technical Details**

### Database Queries Focus On:
- **Most Recent Upload Time:** Gets latest `processed_at` timestamp
- **Upload Batch Window:** 5-minute window around latest upload
- **Live Data Only:** Ignores all historical records in database

### Console Logs Show:
```
🔥 UPLOAD BATCH ONLY: Fetching ONLY the most recent single upload batch...
🔥 UPLOAD BATCH: 3 invoices from latest upload, 20 statements from latest upload
```

### API Response:
```json
{
  "success": true,
  "message": "Successfully processed reconciliation. Found 15 potential matches.",
  "data": {
    "invoiceCount": 3,
    "bankStatementCount": 20,
    "reconciliationCount": 15
  }
}
```

## ⚙️ **Configuration**

### Default Settings:
- **Single Upload Mode:** ✅ Enabled
- **Latest Records Mode:** ❌ Disabled (not needed)
- **Timeframe:** Ignored when single upload mode is on

### Alternative Modes:
- **Uncheck Single Upload Mode** → Use timeframe-based processing
- **Check Latest Records Mode** → Process recent records within timeframe

## 🎉 **Benefits**

1. **Fast Processing:** Only processes your fresh uploads
2. **Relevant Results:** Shows matches for data you just added
3. **No Noise:** Ignores old historical records
4. **Live Focus:** Perfect for real-time reconciliation workflow

## 🔄 **Workflow**
```
Upload Files → Single Upload Mode → Reconciliation → Live Results
     ↓              ↓                    ↓              ↓
20 statements  ✅ Enabled          Processes      Shows matches
3 invoices                       ONLY these      for ONLY these
```

This mode ensures you see reconciliation results for **exactly the data you just uploaded**, not mixed with old historical records!