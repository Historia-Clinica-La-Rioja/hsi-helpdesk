package repositories
package repositories

import (
	"testing"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
)

func TestPreserveIsActiveOnUpdate_WhenIncomingValueIsEmpty(t *testing.T) {
	existing := models.Faq{IsActive: true}
	incoming := models.Faq{}

	updated := preserveActiveStateOnUpdate(existing, incoming)

	if !updated.IsActive {
		t.Fatal("expected active FAQ to remain active when request omits is_active")
	}
}
