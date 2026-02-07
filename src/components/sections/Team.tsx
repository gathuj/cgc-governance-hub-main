import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCSVData } from "@/hooks/useCSVData";
import { Skeleton } from "@/components/ui/skeleton";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  board: "Board" | "Management";
  image: string;
  shortDescription: string;
  fullDescription: string;
  email?: string;
  phone?: string;
}

const TeamMember = ({ member, onSelect }: { member: TeamMember; onSelect: (member: TeamMember) => void }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full" onClick={() => onSelect(member)}>
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-1">{member.name}</h3>
        <p className="text-primary font-semibold text-sm mb-3">{member.position}</p>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 text-justify">
          {member.shortDescription}
        </p>
      </CardContent>
    </Card>
  );
};

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const parseTeam = useCallback((rows: string[][]): TeamMember[] => {
    return rows.map((row, index) => ({
      id: String(index + 1),
      name: row[0] || "",
      position: row[1] || "",
      board: (row[2]?.toLowerCase() === "board" ? "Board" : "Management") as "Board" | "Management",
      image: row[3] || "",
      shortDescription: row[4] || "",
      fullDescription: row[5] || "",
      email: row[6] || "",
      phone: row[7] || "",
    }));
  }, []);

  const { data: teamMembers, loading, error } = useCSVData<TeamMember>(
    "/data/team.csv",
    parseTeam
  );

  const boardMembers = teamMembers.filter((m) => m.board === "Board");
  const managementMembers = teamMembers.filter((m) => m.board === "Management");

  if (error) {
    return (
      <section id="team" className="section-padding bg-background">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">Unable to load team members. Please check the team.csv file in public/data/</p>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="section-padding bg-background">
      <div className="container-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Meet Our Leadership
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg text-justify">
            Our dedicated team of governance experts brings decades of combined experience in corporate secretarial practice, compliance, and strategic board advisory.
          </p>
        </div>

        {/* Board Members Section */}
        {!loading && boardMembers.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Board</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {boardMembers.map((member) => (
                <TeamMember
                  key={member.id}
                  member={member}
                  onSelect={setSelectedMember}
                />
              ))}
            </div>
          </div>
        )}

        {/* Management Members Section */}
        {!loading && managementMembers.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Management</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {managementMembers.map((member) => (
                <TeamMember
                  key={member.id}
                  member={member}
                  onSelect={setSelectedMember}
                />
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div>
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center">Board</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={`board-${i}`} className="aspect-square rounded-lg" />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">Management</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={`mgmt-${i}`} className="aspect-square rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && teamMembers.length === 0 && !error && (
          <p className="text-center text-muted-foreground py-12">No team members added yet.</p>
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
                  {/* Image */}
                  <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedMember.name}</h2>
                      <Badge className="bg-primary text-primary-foreground mb-4">
                        {selectedMember.position}
                      </Badge>
                      <p className="text-muted-foreground text-sm font-medium mb-4">
                        {selectedMember.board} Member
                      </p>
                      <p className="text-foreground leading-relaxed text-justify mb-6">
                        {selectedMember.fullDescription}
                      </p>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 pt-4 border-t">
                      {selectedMember.email && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase">Email</p>
                          <a
                            href={`mailto:${selectedMember.email}`}
                            className="text-primary hover:underline"
                          >
                            {selectedMember.email}
                          </a>
                        </div>
                      )}
                      {selectedMember.phone && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase">Phone</p>
                          <a
                            href={`tel:${selectedMember.phone}`}
                            className="text-primary hover:underline"
                          >
                            {selectedMember.phone}
                          </a>
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
        <div className="mt-12 p-6 bg-secondary rounded-lg border border-border">
          <h3 className="font-bold text-foreground mb-3">Team File Format</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Upload your team members to <code className="bg-muted px-2 py-1 rounded">public/data/team.csv</code> in the following format:
          </p>
          <code className="block text-xs bg-muted p-3 rounded overflow-x-auto">
            Name,Position,Board,Image,ShortDescription,FullDescription,Email,Phone<br/>
            Jane Doe,Chief Executive Officer,Board,https://example.com/jane.jpg,Visionary leader with 20 years of experience,Detailed biography and achievements...,jane@example.com,+1234567890
          </code>
          <p className="text-xs text-muted-foreground mt-2">
            <strong>Board:</strong> Board or Management | <strong>Image:</strong> Full URL to image or local path in src/assets/
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;
