import hmac
import hashlib
import time

class FintechSecurityInterceptor:
    """
    Enterprise-grade Cryptographic Verification Engine designed to block 
    client-side parameter tampering and fraudulent transaction injections.
    """
    def __init__(self, private_webhook_secret: str):
        # Storing the highly secure, server-side secret token safely
        self.secret = private_webhook_secret.encode('utf-8')
        print("⚙️ [Fintech Engine] Cryptographic Interceptor initialized with private secret vault.")

    def verify_payment_signature(self, order_id: str, payment_id: str, client_signature: str) -> bool:
        """
        Executes a strict HMAC SHA256 cryptographic check loop to validate 
        the authenticity of the transaction token returned by the gateway modal.
        """
        # Constructing the expected raw telemetry payload string exactly as sent by the server
        payload_data = f"{order_id}|{payment_id}".encode('utf-8')
        
        start_time = time.perf_counter()
        
        # 🔑 THE CRYPTO SWEEP: Computing the true mathematical signature server-side
        computed_signature = hmac.new(
            self.secret, 
            payload_data, 
            hashlib.sha256
        ).hexdigest()
        
        end_time = time.perf_counter()
        latency_ms = (end_time - start_time) * 1000
        
        print(f"⚡ [Telemetry Check] Cryptographic hash computation latency: {latency_ms:.4f} ms")
        
        # Security Guard Rule: Comparing the client's signature with our computed truth using constant-time comparison
        if hmac.compare_digest(computed_signature, client_signature):
            print("✅ [TRANSACTION VALIDATED] Cryptographic tokens match perfectly. Payment is 100% genuine!")
            return True
        else:
            print("🚨 [CRITICAL ALERT - FRAUD DETECTED] Signature mismatch! Parameter tampering intercepted!")
            return False

if __name__ == "__main__":
    print("🚀 Running Sudhir's Sovereign HMAC SHA256 Fintech Verification Grid...\n")
    
    # 1. Setting up our private encryption token vault (Server-side only)
    SERVER_PRIVATE_SECRET = "raipur_telemetry_secure_key_2026"
    interceptor = FintechSecurityInterceptor(SERVER_PRIVATE_SECRET)
    
    # Simulating a valid order record registered inside our database
    sample_order_id = "order_Mishra_99843"
    sample_payment_id = "pay_Gatway_77215"
    
    # Generating the true valid signature hash mathematically to simulate a successful genuine payment
    genuine_payload = f"{sample_order_id}|{sample_payment_id}".encode('utf-8')
    TRUE_SERVER_SIGNATURE = hmac.new(SERVER_PRIVATE_SECRET.encode('utf-8'), genuine_payload, hashlib.sha256).hexdigest()
    
    print("\n--- TEST CASE 1: PROCESSING A GENUINE CUSTOMER TRANSACTION ---")
    interceptor.verify_payment_signature(sample_order_id, sample_payment_id, TRUE_SERVER_SIGNATURE)
    
    print("\n--- TEST CASE 2: INTERCEPTING A FRAUDULENT CLIENT-SIDE TAMPERING ATTACK ---")
    FAKED_HACKER_SIGNATURE = "abc123fakehash456def789xyz"
    interceptor.verify_payment_signature(sample_order_id, sample_payment_id, FAKED_HACKER_SIGNATURE)
    
    print("\n🎉 Fintech execution grid completed cleanly with 0% runtime exceptions!")