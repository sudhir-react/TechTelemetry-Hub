import time

class ResilientDataParser:
    """
    Enterprise-grade safe extraction module designed to eliminate
    catastrophic AttributeError crashes during volatile web scraping cycles.
    """
    def __init__(self, raw_html_nodes: dict):
        self.nodes = raw_html_nodes
        print("⚙️ [System Engine] Resilient Data Parser initialized with safe fallback matrices.")

    def extract_text_safely(self, target_key: str) -> str:
        """
        Extracts string content from a targeted DOM node descriptor.
        Guarantees a safe fallback marker string if the element resolves to a Null state.
        """
        # Strict conditional step: Intercepting the NoneType payload before any method calls execute
        if target_key not in self.nodes or self.nodes[target_key] is None:
            print(f"⚠️ [Null Node Intercepted] Target key '{target_key}' is missing or None. Suppressing AttributeError safely.")
            return "FALLBACK_NODE_MARKER" # The safe default database injection string
            
        # If the check passes, execute the safe attribute extraction sequence cleanly
        return self.nodes[target_key].strip()

if __name__ == "__main__":
    print("🚀 Running Sudhir's Asynchronous AttributeError Interception Grid...\n")
    
    # Simulating a real scraped record from a medical index portal where the email element is missing
    simulated_scraped_data_vault = {
        "doctor_name": "DR. SUDHIR KUMAR MISHRA ",
        "clinic_address": "Raipur Core Telemetry Station, Chhattisgarh, India",
        "email_node": None # Injected explicitly as a Null/NoneType element to simulate a DOM failure layout
    }
    
    parser = ResilientDataParser(simulated_scraped_data_vault)
    
    start_time = time.perf_counter()
    
    # Running extraction sweeps across stable and unstable data structures cleanly
    validated_name = parser.extract_text_safely("doctor_name")
    validated_email = parser.extract_text_safely("email_node")
    
    end_time = time.perf_counter()
    latency_ms = (end_time - start_time) * 1000
    
    print("-" * 90)
    print(f"👤 Extracted Doctor Name : {validated_name}")
    print(f"📧 Extracted Secure Email : {validated_email}")
    print(f"⚡ Ingestion Validation Speed : {latency_ms:.4f} ms")
    print("-" * 90)
    print("\n🎉 execution matrix completed cleanly with 0% runtime engine exceptions!")