import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useCSVData } from "@/hooks/useCSVData";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  location: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  email?: string;
  phone?: string;
}

const TeamMemberCard = ({ member, onSelect }: { member: TeamMember; onSelect: (member: TeamMember) => void }) => {
  return (
    <div
      className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
      onClick={() => onSelect(member)}
    >
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-foreground mb-1">{member.name}</h3>
        <p className="text-primary font-semibold text-sm mb-2">{member.position}</p>
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
          <MapPin size={12} className="text-primary" />
          <span>{member.location}</span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 text-justify mt-auto">
          {member.shortDescription}
        </p>
      </div>
    </div>
  );
};

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const parseTeam = useCallback((rows: string[][]): TeamMember[] => {
    return rows.map((row, index) => ({
      id: String(index + 1),
      name: row[0] || "",
      position: row[1] || "",
      department: row[2] || "General",
      location: row[3] || "Kenya",
      image: row[4] || "",
      shortDescription: row[5] || "",
      fullDescription: row[6] || "",
      email: row[7] || "",
      phone: row[8] || "",
    }));
  }, []);

  const { data: teamMembers, loading, error } = useCSVData<TeamMember>("/data/team.csv", parseTeam);

  const departments = teamMembers.reduce<Record<string, TeamMember[]>>((acc, member) => {
    const dept = member.department || "General";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(member);
    return acc;
  }, {});

  const deptOrder = ["Leadership", "Operations", "Training"];
  const sortedDepts = Object.keys(departments).sort((a, b) => {
    const ai = deptOrder.indexOf(a);
    const bi = deptOrder.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  if (error) {
    return (
      <section id="team" className="section-padding bg-background">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">Unable to load team members.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="section-padding bg-background">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Team</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our dedicated team of governance experts brings decades of combined experience in corporate secretarial practice, compliance, and strategic board advisory.
          </p>
        </div>

        {loading ? (
          <div className="space-y-16">
            {["Leadership", "Operations"].map((dept) => (
              <div key={dept}>
                <h3 className="text-2xl font-bold mb-8 text-center">{dept}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : teamMembers.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No team members added yet.</p>
        ) : (
          <div className="space-y-20">
            {sortedDepts.map((dept) => {
              const members = departments[dept];
              // Center cards: use max-w and mx-auto for fewer than 4 members
              const gridCols =
                members.length === 1
                  ? "max-w-sm mx-auto"
                  : members.length === 2
                  ? "max-w-2xl mx-auto grid-cols-1 sm:grid-cols-2"
                  : members.length === 3
                  ? "max-w-5xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

              return (
                <div key={dept}>
                  <div className="flex items-center gap-4 mb-10 justify-center">
                    <div className="h-px bg-border flex-1 max-w-[100px]" />
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{dept}</h3>
                    <div className="h-px bg-border flex-1 max-w-[100px]" />
                  </div>
                  <div className={`grid gap-8 ${gridCols}`}>
                    {members.map((member) => (
                      <TeamMemberCard key={member.id} member={member} onSelect={setSelectedMember} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Member Detail Dialog */}
        <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedMember && (
              <>
                <DialogHeader>
                  <DialogTitle className="sr-only">{selectedMember.name}</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                    <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedMember.name}</h2>
                      <Badge className="bg-primary text-primary-foreground mb-2">{selectedMember.position}</Badge>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                        <MapPin size={14} className="text-primary" />
                        <span>{selectedMember.location}</span>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded">{selectedMember.department}</span>
                      </div>
                      <p className="text-foreground leading-relaxed text-justify mb-6">{selectedMember.fullDescription}</p>
                    </div>
                    <div className="space-y-2 pt-4 border-t">
                      {selectedMember.email && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase">Email</p>
                          <a href={`mailto:${selectedMember.email}`} className="text-primary hover:underline">{selectedMember.email}</a>
                        </div>
                      )}
                      {selectedMember.phone && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase">Phone</p>
                          <a href={`tel:${selectedMember.phone}`} className="text-primary hover:underline">{selectedMember.phone}</a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* CSV Format Guide */}
        <div className="mt-16 p-6 bg-secondary rounded-lg border border-border">
          <h3 className="font-bold text-foreground mb-3">Team File Format</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Upload your team members to <code className="bg-muted px-2 py-1 rounded">public/data/team.csv</code> in the following format:
          </p>
          <code className="block text-xs bg-muted p-3 rounded overflow-x-auto">
            Name,Position,Department,Location,Image,ShortDescription,FullDescription,Email,Phone<br />
            Jane Doe,CEO,Leadership,Kenya,https://example.com/jane.jpg,Visionary leader...,Full bio...,jane@example.com,+1234567890
          </code>
          <p className="text-xs text-muted-foreground mt-2">
            <strong>Department:</strong> Leadership, Operations, Training, etc. | <strong>Location:</strong> Kenya or Singapore
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;
